/**
 * Storage Repository Interface
 * 数据存储抽象接口：定义数据访问的标准接口
 *
 * 这个接口允许我们在不修改业务逻辑的情况下切换不同的存储实现
 * 例如：从 JSON 文件切换到 PostgreSQL、MySQL、MongoDB 等
 */

export interface IStorageRepository {
  // ============ Filament Operations ============

  /**
   * 读取所有耗材数据（不包含业务逻辑处理）
   */
  readFilaments(): Promise<any[]>;

  /**
   * 写入所有耗材数据
   */
  writeFilaments(filaments: any[]): Promise<boolean>;

  /**
   * 根据 ID 获取单个耗材
   */
  getFilamentById(id: string): Promise<any | null>;

  /**
   * 添加新耗材
   */
  addFilament(filament: any): Promise<any | null>;

  /**
   * 更新耗材
   */
  updateFilament(id: string, updates: any): Promise<any | null>;

  /**
   * 删除耗材
   */
  deleteFilament(id: string): Promise<boolean>;

  // ============ Settings Operations ============

  /**
   * 读取设置（不包含默认值合并）
   */
  readSettings(): Promise<any>;

  /**
   * 写入设置
   */
  writeSettings(settings: any): Promise<boolean>;

  // ============ Initialization ============

  /**
   * 初始化存储（例如：创建目录、表等）
   */
  initialize(): Promise<void>;
}
