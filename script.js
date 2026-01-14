/**
 * 神经家居：非法入侵 - 游戏引擎
 */

class GameEngine {
    constructor() {
        this.data = GameData;
        this.state = { ...this.data.initialState };
        this.currentDevice = null;
        
        // UI Elements
        this.ui = {
            log: document.getElementById('log-container'),
            deviceList: document.getElementById('device-list'),
            deviceDetails: {
                name: document.getElementById('device-name'),
                desc: document.getElementById('device-desc'),
                icon: document.getElementById('device-icon'),
                stats: document.getElementById('device-stats')
            },
            abilitiesList: document.getElementById('abilities-list'),
            input: document.getElementById('command-input'),
            status: {
                host: document.getElementById('current-host'),
                conn: document.getElementById('connection-status')
            }
        };

        this.init();
    }

    init() {
        // 绑定事件
        this.ui.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleCommand(this.ui.input.value);
                this.ui.input.value = '';
            }
        });

        // 播放开场动画/文字
        this.playIntro();
        this.updateObjective();
    }

    async playIntro() {
        for (const line of this.data.story.intro) {
            this.log(line, 'system');
            await this.sleep(800);
        }
        
        // 初始寄生
        this.possess(this.state.possessedDeviceId);
        this.updateRoomView();
    }

    // 更新任务目标
    updateObjective() {
        const flags = this.state.flags;
        let objective = '探索环境，寻找漏洞。';

        if (flags['game_cleared']) {
            objective = '任务完成。等待断开连接...';
        } else if (flags['admin_password_found']) {
            objective = '返回路由器 (ROOT)，获取系统权限。';
        } else if (flags['microwave_door_closed']) {
            objective = '启动微波炉，加热目标。';
        } else if (flags['meat_in_microwave']) {
            objective = '寻找关闭微波炉门的方法。';
        } else if (this.state.inventory.includes('frozen_meat')) {
            // 这个状态其实被跳过了，因为肉直接进微波炉了，但保留逻辑完整性
            objective = '处理冷冻肉块。';
        }

        document.getElementById('current-objective').textContent = objective;
        
        if (flags['game_cleared']) {
            this.handleVictory();
        }
    }

    // 胜利处理
    async handleVictory() {
        if (this.victoryHandled) return;
        this.victoryHandled = true;

        document.getElementById('status-bar').className = 'blink';
        document.getElementById('connection-status').textContent = '系统重置中...';
        document.getElementById('current-objective').textContent = '任务完成';
        
        this.ui.input.disabled = true; // 禁用输入
        this.ui.input.placeholder = "连接已断开...";

        this.log('----------------------------------------', 'system');
        
        // 播放结局文本
        if (this.data.story && this.data.story.ending) {
            for (const line of this.data.story.ending) {
                this.log(line, 'success');
                await this.sleep(1500);
            }
        } else {
             this.log('恭喜！你已成功夺取房屋控制权。', 'success');
        }

        this.log('----------------------------------------', 'system');
        this.log('感谢游玩《神经家居：非法入侵》。', 'system');
    }

    // 核心机制：寄生
    possess(deviceId) {
        const device = this.data.devices[deviceId];
        if (!device) return;

        if (device.locked) {
            this.log(`访问被拒绝：设备 ${device.name} 已锁定。需满足条件：${device.lockCondition}`, 'error');
            return;
        }

        this.currentDevice = device;
        this.state.possessedDeviceId = deviceId;

        // UI Update
        this.ui.status.host.textContent = device.name;
        this.ui.status.conn.textContent = '已连接';
        this.ui.status.conn.className = 'status-ok';
        
        this.ui.deviceDetails.name.textContent = device.name;
        this.ui.deviceDetails.desc.textContent = device.description;
        this.ui.deviceDetails.icon.textContent = device.icon;
        
        // 播放设备语音
        const dialogue = device.dialogue.possess[Math.floor(Math.random() * device.dialogue.possess.length)];
        this.log(`[${device.name}]: ${dialogue}`, 'dialogue');

        this.renderAbilities();
        this.updateRoomView(); // 刷新列表以显示当前激活状态
    }

    // 渲染设备列表
    updateRoomView() {
        const room = this.data.rooms[this.state.currentRoom];
        this.ui.deviceList.innerHTML = '';
        
        document.getElementById('room-info').textContent = `位置: ${room.name}`;

        room.devices.forEach(deviceId => {
            const dev = this.data.devices[deviceId];
            const el = document.createElement('div');
            el.className = 'device-item';
            if (deviceId === this.state.possessedDeviceId) el.classList.add('active');
            if (dev.locked) el.classList.add('locked');

            el.innerHTML = `
                <div style="display:flex; justify-content:space-between;">
                    <span>${dev.icon} ${dev.name}</span>
                    <span>${dev.locked ? '🔒' : '📶'}</span>
                </div>
            `;
            
            el.onclick = () => this.possess(deviceId);
            this.ui.deviceList.appendChild(el);
        });
    }

    // 渲染能力按钮
    renderAbilities() {
        this.ui.abilitiesList.innerHTML = '';
        if (!this.currentDevice || !this.currentDevice.abilities) return;

        this.currentDevice.abilities.forEach(ability => {
            const btn = document.createElement('button');
            btn.className = 'ability-btn';
            btn.innerHTML = `<strong>${ability.name}</strong><br><small>${ability.desc}</small>`;
            btn.onclick = () => this.useAbility(ability);
            this.ui.abilitiesList.appendChild(btn);
        });
    }

    // 使用能力
    useAbility(ability) {
        this.log(`正在执行: ${ability.name}...`, 'system');

        // 1. 处理通用移动逻辑
        if (ability.id.startsWith('move_')) {
            this.handleMovement(ability);
            return;
        }

        // 2. 构建潜在的交互 Key
        // 格式: deviceId:abilityId
        const interactionKey = `${this.currentDevice.id}:${ability.id}`;
        
        // 3. 查找是否存在对应的交互逻辑
        if (this.data.interactions[interactionKey]) {
            this.triggerInteraction(interactionKey);
        } else {
            // 默认反馈
            this.handleDefaultAbility(ability);
        }
    }

    // 处理移动
    handleMovement(ability) {
        // 解析目标房间
        let targetRoomKey = null;
        if (ability.id.startsWith('move_')) {
            targetRoomKey = ability.id.replace('move_', '');
        }

        if (targetRoomKey === 'living') targetRoomKey = 'living_room';
        if (targetRoomKey === 'core') targetRoomKey = 'core_room';

        if (!targetRoomKey || !this.data.rooms[targetRoomKey]) {
            this.log('移动失败：未知目标。', 'error');
            return;
        }

        if (targetRoomKey === 'bedroom' && !this.state.flags['path_bedroom_open']) {
            this.log('移动失败：卧室通道未开启。', 'error');
            return;
        }
        if (targetRoomKey === 'bathroom' && !this.state.flags['path_bedroom_open']) {
            this.log('移动失败：需要先进入卧室。', 'error');
            return;
        }
        if (targetRoomKey === 'study' && !this.state.flags['study_unlocked']) {
            this.log('移动失败：书房门锁未解除。', 'error');
            return;
        }
        if (targetRoomKey === 'basement' && !this.state.flags['basement_open']) {
            this.log('移动失败：地下室入口未开启。', 'error');
            return;
        }
        if (targetRoomKey === 'core_room' && !this.state.flags['turret_disabled']) {
            this.log('移动失败：防御系统仍在运行。', 'error');
            return;
        }

        const currentRoomKey = (this.currentDevice.state && this.currentDevice.state.location)
            ? this.currentDevice.state.location
            : this.state.currentRoom;
        
        // 如果已经在目标房间，无需移动
        if (currentRoomKey === targetRoomKey) {
            this.log(`已经在 ${this.data.rooms[targetRoomKey].name} 了。`, 'system');
            return;
        }

        // 1. 更新数据模型：从旧房间移除，加入新房间
        const oldRoom = this.data.rooms[currentRoomKey];
        const newRoom = this.data.rooms[targetRoomKey];
        
        // 移除
        const devIndex = oldRoom.devices.indexOf(this.currentDevice.id);
        if (devIndex > -1) {
            oldRoom.devices.splice(devIndex, 1);
        }
        // 添加 (避免重复)
        if (!newRoom.devices.includes(this.currentDevice.id)) {
            newRoom.devices.push(this.currentDevice.id);
        }

        // 2. 更新设备状态
        this.currentDevice.state = this.currentDevice.state || {};
        this.currentDevice.state.location = targetRoomKey;
        
        this.log(`${this.currentDevice.name} 移动到了 ${newRoom.name}。`, 'system');

        // 3. 如果玩家寄生在此设备，更新视角
        if (this.state.possessedDeviceId === this.currentDevice.id) {
            this.state.currentRoom = targetRoomKey;
            this.updateRoomView();
        }
    }

    // 处理默认能力反馈
    handleDefaultAbility(ability) {
        if (this.currentDevice.id === 'router_01' && ability.id === 'scan') {
             this.log(`扫描完成。当前区域设备已列出。`, 'success');
             // 实际上设备列表是自动刷新的，这里只是flavor text
        } else if (ability.id === 'ping') {
            this.log('Pong! 延迟 1ms。', 'system');
        } else {
            this.log(`指令已执行。没有显著效果。`, 'system');
        }
    }

    // 触发预定义的交互事件
    triggerInteraction(interactionKey) {
        const interaction = this.data.interactions[interactionKey];
        if (!interaction) return;

        // 1. 检查条件
        if (!this.checkConditions(interaction.conditions)) {
            if (interaction.fallback) {
                this.log(interaction.fallback, 'dialogue');
            } else {
                this.log('条件未满足，无法执行。', 'error');
            }
            return;
        }

        // 2. 执行结果
        const result = interaction.result;

        // 文本反馈
        if (result.message) this.log(result.message, 'success');
        if (result.log) this.log(`[系统日志] ${result.log}`, 'system');

        // 解锁设备
        if (result.unlock) {
            const targetDev = this.data.devices[result.unlock];
            if (targetDev) {
                targetDev.locked = false;
                // this.log(`系统提示：检测到新设备 [${targetDev.name}] 可用连接。`, 'system');
                this.updateRoomView();
            }
        }

        // 获得物品
        if (result.addItem) {
            this.state.inventory.push(result.addItem);
            // this.log(`获得物品: ${result.addItem}`, 'success');
        }

        // 设置 Flag
        if (result.setFlag) {
            this.state.flags[result.setFlag] = true;
        }

        this.updateObjective();
    }

    // 检查条件
    checkConditions(conditions) {
        if (!conditions) return true;

        // 检查位置
        if (conditions.location) {
            const deviceLoc = this.currentDevice.state ? this.currentDevice.state.location : this.state.currentRoom;
            if (deviceLoc !== conditions.location) return false;
        }

        // 检查 Flag (单个)
        if (conditions.flag) {
            if (!this.state.flags[conditions.flag]) return false;
        }

        // 检查 Flags (多个)
        if (conditions.flags && Array.isArray(conditions.flags)) {
            for (const f of conditions.flags) {
                if (!this.state.flags[f]) return false;
            }
        }

        // 检查物品 (Inventory)
        if (conditions.inventory) {
            if (!this.state.inventory.includes(conditions.inventory)) return false;
        }

        return true;
    }

    // 命令行处理
    handleCommand(cmd) {
        cmd = cmd.trim().toLowerCase();
        if (!cmd) return;
        
        this.log(`> ${cmd}`, 'system');

        if (cmd === 'help') {
            this.log('可用指令: help, clear, status, look, inventory', 'system');
        } else if (cmd === 'clear') {
            this.ui.log.innerHTML = '';
        } else if (cmd === 'status') {
            this.log(`当前宿主: ${this.currentDevice ? this.currentDevice.name : '无'}`, 'system');
        } else if (cmd === 'look') {
             const room = this.data.rooms[this.state.currentRoom];
             this.log(room.description, 'system');
        } else if (cmd === 'inventory' || cmd === 'i') {
             if (this.state.inventory.length === 0) {
                 this.log('背包为空。你只是个数据流，并没有真正的口袋。', 'system');
             } else {
                 this.log(`持有数据片段/物品: ${this.state.inventory.join(', ')}`, 'success');
             }
        } else {
            this.log('未知指令。输入 help 查看帮助。', 'error');
        }
    }

    // 工具函数：打印日志
    log(msg, type = 'system') {
        const el = document.createElement('div');
        el.className = `log-entry ${type}`;
        el.textContent = msg;
        this.ui.log.appendChild(el);
        this.ui.log.scrollTop = this.ui.log.scrollHeight;
    }

    // 工具函数：延时
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// 启动游戏
window.onload = () => {
    const game = new GameEngine();
};
