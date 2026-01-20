import express from 'express';
import {
  readFilaments,
  getFilamentById,
  addFilament,
  updateFilament,
  deleteFilament,
  readSettings,
  writeSettings
} from './storage-new.js';

const router = express.Router();

// 获取密码配置
const getPassword = () => {
  return process.env.APP_PASSWORD || 'golem';
};

// 认证中间件
const authMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token || token !== getPassword()) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  next();
};

// ============ 登录路由 ============

// POST /api/login - 登录
router.post('/login', (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ success: false, error: 'Password is required' });
  }

  if (password === getPassword()) {
    res.json({
      success: true,
      data: {
        token: password,
        username: 'golem'
      }
    });
  } else {
    res.status(401).json({ success: false, error: 'Invalid password' });
  }
});

// ============ 耗材相关路由 (需要认证) ============

// GET /api/filaments - 获取所有耗材
router.get('/filaments', authMiddleware, async (req, res) => {
  try {
    const filaments = await readFilaments();
    res.json({ success: true, data: filaments });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch filaments' });
  }
});

// GET /api/filaments/:id - 获取单个耗材
router.get('/filaments/:id', authMiddleware, async (req, res) => {
  try {
    const filament = await getFilamentById(req.params.id as string);
    if (!filament) {
      return res.status(404).json({ success: false, error: 'Filament not found' });
    }
    res.json({ success: true, data: filament });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch filament' });
  }
});

// POST /api/filaments - 添加新耗材
router.post('/filaments', authMiddleware, async (req, res) => {
  try {
    const filament = await addFilament(req.body);
    if (!filament) {
      return res.status(500).json({ success: false, error: 'Failed to create filament' });
    }
    res.json({ success: true, data: filament });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to create filament' });
  }
});

// PUT /api/filaments/:id - 更新耗材
router.put('/filaments/:id', authMiddleware, async (req, res) => {
  try {
    const filament = await updateFilament(req.params.id as string, req.body);
    if (!filament) {
      return res.status(404).json({ success: false, error: 'Filament not found' });
    }
    res.json({ success: true, data: filament });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update filament' });
  }
});

// DELETE /api/filaments/:id - 删除耗材
router.delete('/filaments/:id', authMiddleware, async (req, res) => {
  try {
    const success = await deleteFilament(req.params.id as string);
    if (!success) {
      return res.status(404).json({ success: false, error: 'Filament not found' });
    }
    res.json({ success: true, message: 'Filament deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete filament' });
  }
});

// POST /api/filaments/:id/deduct - 扣减耗材重量
router.post('/filaments/:id/deduct', authMiddleware, async (req, res) => {
  try {
    const { amount } = req.body;

    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ success: false, error: 'Invalid deduction amount' });
    }

    // 获取当前耗材数据
    const filament = await getFilamentById(req.params.id as string);
    if (!filament) {
      return res.status(404).json({ success: false, error: 'Filament not found' });
    }

    // 计算扣减后的重量
    const newWeightRemaining = Math.max(0, filament.weightRemaining - amount);

    if (newWeightRemaining > filament.weightTotal) {
      return res.status(400).json({ success: false, error: 'Invalid weight calculation' });
    }

    // 更新耗材
    const updatedFilament = await updateFilament(req.params.id as string, {
      weightRemaining: newWeightRemaining
    });

    if (!updatedFilament) {
      return res.status(500).json({ success: false, error: 'Failed to deduct weight' });
    }

    res.json({ success: true, data: updatedFilament });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to deduct weight' });
  }
});

// ============ 设置相关路由 ============

// GET /api/settings - 获取设置
router.get('/settings', authMiddleware, async (req, res) => {
  try {
    const settings = await readSettings();
    res.json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch settings' });
  }
});

// POST /api/settings - 更新设置
router.post('/settings', authMiddleware, async (req, res) => {
  try {
    const success = await writeSettings(req.body);
    if (!success) {
      return res.status(500).json({ success: false, error: 'Failed to save settings' });
    }
    const settings = await readSettings();
    res.json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to save settings' });
  }
});

export default router;
