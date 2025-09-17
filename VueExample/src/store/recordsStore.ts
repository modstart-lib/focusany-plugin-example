import {computed, reactive} from "vue";

export interface Record {
    id: string;
    name: string;
    value: number;
    createdAt: string;
}

interface RecordsState {
    records: Record[];
    loading: boolean;
    error: string | null;
}

// 创建响应式状态
const state = reactive<RecordsState>({
    records: [],
    loading: false,
    error: null,
});

// 计算属性
const getters = {
    recordCount: computed(() => state.records.length),
    totalValue: computed(() => state.records.reduce((sum, record) => sum + record.value, 0)),
    averageValue: computed(() => {
        if (state.records.length === 0) return 0;
        return state.records.reduce((sum, record) => sum + record.value, 0) / state.records.length;
    }),
};

// 动作方法
const actions = {
    // 初始化数据
    async initialize() {
        try {
            state.loading = true;
            state.error = null;

            // 从 FocusAny 存储中加载数据
            const savedRecords = await focusany.dbStorage.getItem("records");

            if (savedRecords && Array.isArray(savedRecords)) {
                state.records = savedRecords;
                console.log("Records 数据加载完成", state.records.length);
            } else {
                console.log("没有找到保存的 records 数据");
            }
        } catch (error) {
            state.error = `加载数据失败: ${error}`;
            console.error("Records 初始化失败:", error);
        } finally {
            state.loading = false;
        }
    },

    // 添加记录
    async addRecord(name: string, value: number) {
        try {
            const newRecord: Record = {
                id: Date.now().toString(),
                name,
                value,
                createdAt: new Date().toISOString(),
            };

            state.records.push(newRecord);
            await actions.saveRecords();

            focusany.showNotification(`记录 "${name}" 添加成功`);
            return newRecord;
        } catch (error) {
            state.error = `添加记录失败: ${error}`;
            throw error;
        }
    },

    // 更新记录
    async updateRecord(id: string, updates: Partial<Omit<Record, "id" | "createdAt">>) {
        try {
            const recordIndex = state.records.findIndex(r => r.id === id);
            if (recordIndex === -1) {
                throw new Error("记录不存在");
            }

            state.records[recordIndex] = {...state.records[recordIndex], ...updates};
            await actions.saveRecords();

            focusany.showNotification("记录更新成功");
            return state.records[recordIndex];
        } catch (error) {
            state.error = `更新记录失败: ${error}`;
            throw error;
        }
    },

    // 删除记录
    async deleteRecord(id: string) {
        try {
            const recordIndex = state.records.findIndex(r => r.id === id);
            if (recordIndex === -1) {
                throw new Error("记录不存在");
            }

            const record = state.records[recordIndex];
            state.records.splice(recordIndex, 1);
            await actions.saveRecords();

            focusany.showNotification(`记录 "${record.name}" 删除成功`);
        } catch (error) {
            state.error = `删除记录失败: ${error}`;
            throw error;
        }
    },

    // 清空所有记录
    async clearRecords() {
        try {
            state.records = [];
            await actions.saveRecords();
            focusany.showNotification("所有记录已清空");
        } catch (error) {
            state.error = `清空记录失败: ${error}`;
            throw error;
        }
    },

    // 保存记录到存储
    async saveRecords() {
        try {
            await focusany.dbStorage.setItem("records", JSON.parse(JSON.stringify(state.records)));
            console.log("Records 数据已保存");
        } catch (error) {
            console.error("保存 records 数据失败:", error);
            throw error;
        }
    },

    // 创建示例数据
    async createSampleRecords() {
        const sampleRecords: Omit<Record, "id" | "createdAt">[] = [
            {name: "示例记录1", value: 100},
            {name: "示例记录2", value: 200},
            {name: "示例记录3", value: 150},
        ];

        for (const record of sampleRecords) {
            await actions.addRecord(record.name, record.value);
        }
    },

    // 清除错误
    clearError() {
        state.error = null;
    },
};

// 导出 records store
export const recordsStore = {
    state,
    getters,
    actions,
};
