import express from 'express';
import { readFilaments, getFilamentById, addFilament, updateFilament, deleteFilament, readSettings, writeSettings } from './storage.js';
const router = express.Router();
// GET /api/filaments - 获取所有耗材
router.get('/filaments', (req, res) => {
    try {
        const filaments = readFilaments();
        res.json({ success: true, data: filaments });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch filaments' });
    }
});
// GET /api/filaments/:id - 获取单个耗材
router.get('/filaments/:id', (req, res) => {
    try {
        const filament = getFilamentById(req.params.id);
        if (!filament) {
            return res.status(404).json({ success: false, error: 'Filament not found' });
        }
        res.json({ success: true, data: filament });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch filament' });
    }
});
// POST /api/filaments - 添加新耗材
router.post('/filaments', (req, res) => {
    try {
        const filament = addFilament(req.body);
        if (!filament) {
            return res.status(500).json({ success: false, error: 'Failed to create filament' });
        }
        res.json({ success: true, data: filament });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to create filament' });
    }
});
// PUT /api/filaments/:id - 更新耗材
router.put('/filaments/:id', (req, res) => {
    try {
        const filament = updateFilament(req.params.id, req.body);
        if (!filament) {
            return res.status(404).json({ success: false, error: 'Filament not found' });
        }
        res.json({ success: true, data: filament });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to update filament' });
    }
});
// DELETE /api/filaments/:id - 删除耗材
router.delete('/filaments/:id', (req, res) => {
    try {
        const success = deleteFilament(req.params.id);
        if (!success) {
            return res.status(404).json({ success: false, error: 'Filament not found' });
        }
        res.json({ success: true, message: 'Filament deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to delete filament' });
    }
});
// ============ 设置相关路由 ============
// GET /api/settings - 获取设置
router.get('/settings', (req, res) => {
    try {
        const settings = readSettings();
        res.json({ success: true, data: settings });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch settings' });
    }
});
// POST /api/settings - 更新设置
router.post('/settings', (req, res) => {
    try {
        const success = writeSettings(req.body);
        if (!success) {
            return res.status(500).json({ success: false, error: 'Failed to save settings' });
        }
        const settings = readSettings();
        res.json({ success: true, data: settings });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to save settings' });
    }
});
export default router;
