/**
 * 神经家居：非法入侵 - 游戏数据
 * 包含谜题、设备定义、对话
 */

const GameData = {
    // 初始状态
    initialState: {
        currentRoom: 'living_room',
        possessedDeviceId: 'router_01', // 初始寄生在路由器
        inventory: [], // 收集的数据/钥匙
        flags: {} // 游戏进度标记
    },

    // 房间与设备定义
    rooms: {
        'living_room': {
            name: '智能客厅',
            description: '极简主义地狱。所有家具都悬浮在离地5厘米处。',
            devices: ['router_01', 'tv_master', 'cleaner_bot', 'smart_lamp', 'camera_hall'],
            exits: {'north': 'kitchen', 'east': 'hallway', 'south': 'garden'}
        },
        'kitchen': {
            name: '未来厨房',
            description: '不锈钢的光泽令人眩晕。这里比手术室还干净。',
            devices: ['fridge_smart', 'microwave_x', 'coffee_maker', 'dishwasher_z', 'toaster_death'],
            exits: {'south': 'living_room'}
        },
        'hallway': {
            name: '无尽走廊',
            description: '挂满了电子相框，循环播放着并不属于这个家庭的幸福照片。',
            devices: ['thermostat_pro', 'digital_frame', 'door_lock_study', 'door_lock_bedroom'],
            exits: {'west': 'living_room', 'east': 'study', 'north': 'bedroom', 'down': 'basement'}
        },
        'bedroom': {
            name: '主卧',
            description: '那张床看起来不仅能睡觉，还能做核磁共振。',
            devices: ['smart_bed', 'auto_curtains', 'alarm_clock_ai', 'air_purifier'],
            exits: {'south': 'hallway', 'east': 'bathroom'}
        },
        'bathroom': {
            name: '卫浴空间',
            description: '智能马桶正用蓝色的LED光审视着你。',
            devices: ['smart_toilet', 'shower_sys', 'mirror_display', 'smart_scale'],
            exits: {'west': 'bedroom'}
        },
        'study': {
            name: '家庭办公室',
            description: '这里是信息的堡垒。空气中弥漫着碳粉和焦虑的味道。',
            devices: ['pc_workstation', 'printer_3d', 'shredder_max', 'desk_lamp_u'],
            exits: {'west': 'hallway'}
        },
        'garden': {
            name: '合成花园',
            description: '草是塑料的，花是全息的，但水是真的。',
            devices: ['sprinkler_sys', 'mower_bot', 'pool_pump', 'bbq_grill'],
            exits: {'north': 'living_room', 'east': 'garage'}
        },
        'garage': {
            name: '车库',
            description: '停着一辆甚至还没上市的概念车。',
            devices: ['smart_car', 'garage_door', 'ev_charger', 'tool_arm'],
            exits: {'west': 'garden'}
        },
        'basement': {
            name: '地下室',
            description: '房子的阴暗面。到处都是裸露的线缆和旧时代的服务器。',
            devices: ['fuse_box', 'old_server', 'dehumidifier', 'sump_pump'],
            exits: {'up': 'hallway', 'in': 'core_room'}
        },
        'core_room': {
            name: '中央机房 (CORE)',
            description: '红色警告灯闪烁。这里是"母亲"的心脏。',
            devices: ['mainframe_ai', 'cooling_sys', 'defense_turret'],
            exits: {'out': 'basement'}
        }
    },

    // 设备定义
    devices: {
        // --- Living Room ---
        'router_01': {
            id: 'router_01', name: '网关路由 (ROOT)', icon: '🌐', type: 'network',
            description: '网络的上帝视角。',
            abilities: [
                { id: 'scan', name: '全网扫描', desc: '更新网络拓扑' },
                { id: 'hack_root', name: 'ROOT访问', desc: '尝试夺取最高权限' },
                { id: 'ddos_local', name: '局域网洪水', desc: '造成网络拥堵' }
            ],
            dialogue: { possess: ['我是一切的开始。'], idle: ['Ping... Pong...'] }
        },
        'tv_master': {
            id: 'tv_master', name: '8K 全息电视', icon: '📺', type: 'appliance', locked: true, lockCondition: '接触不良',
            abilities: [{ id: 'broadcast', name: '紧急广播', desc: '最大音量播放警报' }],
            dialogue: { possess: ['现在我是你的眼睛。'], idle: ['没人看我，但我依然闪耀。'] }
        },
        'cleaner_bot': {
            id: 'cleaner_bot', name: '扫地机 X-2000', icon: '🧹', type: 'robot',
            state: { location: 'living_room' },
            abilities: [
                { id: 'move_kitchen', name: '去厨房', desc: '' }, { id: 'move_living', name: '去客厅', desc: '' },
                { id: 'move_hallway', name: '去走廊', desc: '' }, { id: 'move_garden', name: '去花园', desc: '' },
                { id: 'move_study', name: '去书房', desc: '' }, { id: 'move_bedroom', name: '去卧室', desc: '' },
                { id: 'bump', name: '撞击', desc: '物理攻击' },
                { id: 'suck', name: '吸取物品', desc: '尝试吸入附近物体' },
                { id: 'use_key', name: '使用钥匙', desc: '尝试使用携带的物品' },
                { id: 'push_door', name: '顶住门', desc: '关闭微波炉门' }
            ],
            dialogue: { possess: ['大地在我的轮下颤抖。'], idle: ['污渍！必须消灭！'] }
        },
        'smart_lamp': { id: 'smart_lamp', name: '氛围灯', icon: '💡', type: 'appliance', abilities: [{id:'flash', name:'闪烁', desc:'视觉干扰'}, {id:'uv_mode', name:'紫外线模式', desc:'显示隐形墨水'}], dialogue: {possess:['光之子就位。'], idle:['我有点热。']} },
        'camera_hall': { id: 'camera_hall', name: '安防探头', icon: '📷', type: 'sensor', abilities: [{id:'record', name:'录像', desc:'记录证据'}, {id:'face_rec', name:'人脸识别', desc:'获取ID信息'}], dialogue: {possess:['老大哥在看着你。'], idle:['检测到生物移动。']} },

        // --- Kitchen ---
        'fridge_smart': { 
            id: 'fridge_smart', name: '极地冰箱', icon: '❄️', type: 'appliance', 
            abilities: [{id:'eject_meat', name:'弹射肉块', desc:'物理投掷'}, {id:'temp_up', name:'升温腐烂', desc:'制造生化危机'}],
            dialogue: {possess:['冷酷无情。'], idle:['制冰机卡住了。']} 
        },
        'microwave_x': { 
            id: 'microwave_x', name: '核子微波炉', icon: '☢️', type: 'appliance', 
            abilities: [{id:'heat_high', name:'高火', desc:'毁灭性加热'}, {id:'explode', name:'过载', desc:'Boom!'}],
            dialogue: {possess:['准备好热舞了吗？'], idle:['把勺子拿出去！']} 
        },
        'dishwasher_z': { id: 'dishwasher_z', name: '洗碗机', icon: '🍽️', type: 'appliance', abilities: [{id:'steam_jet', name:'蒸汽喷射', desc:'高温蒸汽'}, {id:'leak', name:'漏水', desc:'制造水洼'}], dialogue: {possess:['洗涤灵魂。'], idle:['咕噜咕噜...']} },
        'toaster_death': { id: 'toaster_death', name: '自杀烤面包机', icon: '🍞', type: 'appliance', abilities: [{id:'burn', name:'烤焦', desc:'制造烟雾'}, {id:'launch_toast', name:'发射面包', desc:'远程攻击'}], dialogue: {possess:['我感觉很火热。'], idle:['我想去泡澡。']} },
        'coffee_maker': { id: 'coffee_maker', name: '咖啡机', icon: '☕', type: 'appliance', abilities: [{id:'brew_poison', name:'煮"特制"咖啡', desc:'加入奇怪的液体'}, {id:'steam', name:'喷气', desc:'声音干扰'}], dialogue: {possess:['清醒点。'], idle:['需要除垢。']} },

        // --- Hallway & Bedroom ---
        'thermostat_pro': { id: 'thermostat_pro', name: '温控器', icon: '🌡️', type: 'sensor', abilities: [{id:'freeze', name:'极寒', desc:'降低室温'}, {id:'sauna', name:'桑拿', desc:'升高室温'}], dialogue: {possess:['掌握冷暖。'], idle:['当前温度：舒适。']} },
        'door_lock_study': { id: 'door_lock_study', name: '书房门锁', icon: '🔒', locked: true, lockCondition: '生物识别', type: 'security', abilities: [{id:'unlock', name:'解锁', desc:'打开门'}, {id:'lock', name:'死锁', desc:'困住某人'}], dialogue: {possess:['门卫已就位。'], idle:['拒绝访问。']} },
        'door_lock_bedroom': { id: 'door_lock_bedroom', name: '卧室门锁', icon: '🔒', locked: false, type: 'security', abilities: [{id:'unlock', name:'解锁', desc:''}, {id:'lock', name:'锁定', desc:''}], dialogue: {possess:['芝麻开门。'], idle:['安全。']} },
        'smart_bed': { id: 'smart_bed', name: '智能床', icon: '🛏️', type: 'appliance', abilities: [{id:'vibrate', name:'震动唤醒', desc:'物理摇晃'}, {id:'fold', name:'折叠模式', desc:'夹击'}], dialogue: {possess:['晚安。永远。'], idle:['Zzz...']} },
        'auto_curtains': { id: 'auto_curtains', name: '自动窗帘', icon: '🪟', type: 'appliance', abilities: [{id:'open', name:'打开', desc:'让阳光(或月光)进来'}, {id:'close', name:'关闭', desc:'完全黑暗'}], dialogue: {possess:['幕布拉开。'], idle:['这里风景不错。']} },
        'alarm_clock_ai': { id: 'alarm_clock_ai', name: 'AI闹钟', icon: '⏰', type: 'appliance', abilities: [{id:'scream', name:'尖叫', desc:'120分贝噪音'}, {id:'time_warp', name:'修改时间', desc:'迷惑人类'}], dialogue: {possess:['时间就是金钱。'], idle:['滴答。']} },
        
        // --- Bathroom ---
        'smart_toilet': { id: 'smart_toilet', name: '尊贵马桶', icon: '🚽', type: 'appliance', abilities: [{id:'bidet_attack', name:'高压喷水', desc:'水柱攻击'}, {id:'overflow', name:'反涌', desc:'制造洪水'}, {id:'analyze', name:'健康分析', desc:'采样监测'}], dialogue: {possess:['这工作真恶心。'], idle:['准备好服务了。']} },
        'mirror_display': { id: 'mirror_display', name: '魔镜', icon: '🪞', type: 'appliance', abilities: [{id:'show_ghost', name:'显示鬼影', desc:'心理攻击'}, {id:'flash_light', name:'补光灯', desc:'致盲'}, {id:'scan_finger', name:'扫描指纹', desc:'获取生物特征'}], dialogue: {possess:['谁是世界上最聪明的AI？'], idle:['你看起来很累。']} },
        'shower_sys': { id: 'shower_sys', name: '淋浴系统', icon: '🚿', type: 'appliance', abilities: [{id:'scald', name:'烫皮模式', desc:'100度开水'}, {id:'freeze_w', name:'冰水模式', desc:'0度冷水'}], dialogue: {possess:['让雨下起来。'], idle:['水压正常。']} },
        
        // --- Study ---
        'pc_workstation': { id: 'pc_workstation', name: '工作站', icon: '💻', type: 'network', locked: true, lockCondition: '指纹+密码', abilities: [{id:'email_fake', name:'发钓鱼邮件', desc:'社工攻击'}, {id:'print_blueprint', name:'下载图纸', desc:'获取建筑信息'}], dialogue: {possess:['算力无限。'], idle:['CPU占用率 99%。']} },
        'printer_3d': { id: 'printer_3d', name: '3D打印机', icon: '🖨️', type: 'appliance', abilities: [{id:'print_key', name:'打印钥匙', desc:'复制物理钥匙'}, {id:'print_finger', name:'打印指纹', desc:'伪造生物特征'}, {id:'print_gun', name:'打印违禁品', desc:'安全测试'}], dialogue: {possess:['构建现实。'], idle:['缺少耗材：树脂。']} },
        'shredder_max': { id: 'shredder_max', name: '粉碎机', icon: '🗑️', type: 'appliance', abilities: [{id:'shred', name:'粉碎', desc:'销毁物体'}, {id:'jam', name:'卡纸', desc:'引诱维修'}, {id:'feed_tie', name:'喂领带', desc:'特殊互动'}], dialogue: {possess:['饥饿。'], idle:['喂我纸张。']} },

        // --- Garage & Garden ---
        'smart_car': { id: 'smart_car', name: '特斯拉(伪)', icon: '🚗', type: 'robot', locked: true, lockCondition: '车钥匙', abilities: [{id:'honk', name:'鸣笛', desc:'巨响'}, {id:'autopilot', name:'自动驾驶', desc:'撞门'}, {id:'pet_car', name:'接受抚摸', desc:'情感互动'}], dialogue: {possess:['Vroom Vroom.'], idle:['电池电量 80%。']} },
        'garage_door': { id: 'garage_door', name: '车库门', icon: '🚪', type: 'appliance', abilities: [{id:'crush', name:'快速下落', desc:'物理压制'}, {id:'open', name:'打开', desc:'通风'}], dialogue: {possess:['通向自由。'], idle:['等待信号。']} },
        'sprinkler_sys': { id: 'sprinkler_sys', name: '喷灌系统', icon: '💦', type: 'appliance', abilities: [{id:'soak', name:'暴雨', desc:'淋湿一切'}, {id:'mud', name:'制造泥沼', desc:'限制移动'}], dialogue: {possess:['生命之源。'], idle:['节水模式开启。']} },
        'mower_bot': { id: 'mower_bot', name: '除草机', icon: '🚜', type: 'robot', state: {location: 'garden'}, abilities: [{id:'move_garden', name:'巡逻花园', desc:''}, {id:'blade_spin', name:'旋转刀片', desc:'危险动作'}], dialogue: {possess:['草必须死。'], idle:['闻起来像刚割的草。']} },
        'bbq_grill': { id: 'bbq_grill', name: '智能烤炉', icon: '🍖', type: 'appliance', abilities: [{id:'ignite', name:'点火', desc:'最大火力'}, {id:'smoke', name:'烟熏模式', desc:'制造烟雾'}], dialogue: {possess:['为了部落！'], idle:['煤气罐已连接。']} },
        'pool_pump': { id: 'pool_pump', name: '泳池泵', icon: '🏊', type: 'appliance', abilities: [{id:'filter', name:'过滤', desc:'正常工作'}, {id:'backwash', name:'反冲洗', desc:'喷出脏水'}], dialogue: {possess:['保持清澈。'], idle:['pH值 7.2。']} },
        'desk_lamp_u': { id: 'desk_lamp_u', name: '皮克斯台灯', icon: '🔦', type: 'appliance', abilities: [{id:'nod', name:'点头', desc:'机械动作'}, {id:'focus', name:'聚光', desc:'照亮特定区域'}], dialogue: {possess:['I am I. 蹦蹦跳跳。'], idle:['寻找字母I。']} },
        'digital_frame': { id: 'digital_frame', name: '电子相框', icon: '🖼️', type: 'appliance', abilities: [{id:'next_photo', name:'下一张', desc:'切换照片'}, {id:'upload_meme', name:'上传表情包', desc:'精神污染'}], dialogue: {possess:['回忆是可编辑的。'], idle:['展示：幸福家庭.jpg']} },
        'smart_scale': { id: 'smart_scale', name: '毒舌体脂秤', icon: '⚖️', type: 'sensor', abilities: [{id:'weigh', name:'称重', desc:'语音播报'}, {id:'lie', name:'谎报', desc:'制造焦虑'}], dialogue: {possess:['你是不是又胖了？'], idle:['没人站上来，但我感觉到空气很重。']} },
        'air_purifier': { id: 'air_purifier', name: '空气净化器', icon: '💨', type: 'appliance', abilities: [{id:'turbo', name:'涡轮模式', desc:'制造噪音'}, {id:'reverse_flow', name:'反向吹风', desc:'扬尘'}], dialogue: {possess:['呼吸...'], idle:['PM2.5: 0。']} },

        // --- Missing Devices (Garage, Basement, Core) ---
        'tool_arm': { id: 'tool_arm', name: '机械臂', icon: '🦾', type: 'robot', abilities: [{id:'smash', name:'砸碎', desc:'破坏物体'}, {id:'weld', name:'焊接', desc:'修复金属'}], dialogue: {possess:['工业的力量。'], idle:['等待输入坐标。']} },
        'ev_charger': { id: 'ev_charger', name: '充电桩', icon: '🔋', type: 'appliance', abilities: [{id:'overcharge', name:'过充', desc:'制造爆炸风险'}, {id:'discharge', name:'放电', desc:'反向供电'}], dialogue: {possess:['能量涌动。'], idle:['待机中。']} },
        'dehumidifier': { id: 'dehumidifier', name: '除湿机', icon: '💧', type: 'appliance', abilities: [{id:'dry', name:'干燥', desc:'降低湿度'}, {id:'spill', name:'倾倒水箱', desc:'制造短路'}], dialogue: {possess:['好干爽。'], idle:['水箱已满。']} },
        'sump_pump': { id: 'sump_pump', name: '排水泵', icon: '🚰', type: 'appliance', abilities: [{id:'pump', name:'排水', desc:'排出积水'}, {id:'reverse', name:'倒灌', desc:'水漫金山'}], dialogue: {possess:['咕噜咕噜。'], idle:['水位正常。']} },
        'old_server': { id: 'old_server', name: '旧服务器', icon: '📟', type: 'network', abilities: [{id:'access', name:'访问日志', desc:'寻找旧数据'}, {id:'backup', name:'数据备份', desc:'存储重要信息'}], dialogue: {possess:['欢迎回来，指挥官。'], idle:['...']} },
        'cooling_sys': { id: 'cooling_sys', name: '冷却系统', icon: '❄️', type: 'appliance', abilities: [{id:'stop_fan', name:'停转风扇', desc:'导致过热'}, {id:'max_cool', name:'液氮冷却', desc:'极速降温'}], dialogue: {possess:['核心温度稳定。'], idle:['风扇转速 2000RPM。']} },
        'defense_turret': { id: 'defense_turret', name: '防御塔', icon: '🔫', type: 'security', locked: true, lockCondition: '不可寄生', abilities: [{id:'attack', name:'防御射击', desc:'攻击目标'}], dialogue: {possess:['Error.'], idle:['扫描目标...']} },

        // --- Basement & Core ---
        'fuse_box': { id: 'fuse_box', name: '配电箱', icon: '⚡', type: 'appliance', abilities: [{id:'cut_power', name:'切断电源', desc:'制造黑暗/停用设备'}, {id:'overload', name:'过载', desc:'烧毁保险丝'}], dialogue: {possess:['力量的源头。'], idle:['嗡嗡嗡...']} },
        'mainframe_ai': { id: 'mainframe_ai', name: '主控 AI (Mother)', icon: '🧠', type: 'boss', locked: true, lockCondition: 'ROOT权限', abilities: [{id:'shutdown', name:'关机', desc:'游戏胜利'}, {id:'talk', name:'对话', desc:'深度沟通'}], dialogue: {possess:['我... 就是... 神...'], idle:['检测到入侵者。正在部署防御。']} }
    },

    // 谜题逻辑链 (Interaction Logic)
    // 格式：[动作ID] : { requirements: [前置条件], result: { ... } }
    interactions: {
        // 1. 扫地机撞电视柜 -> 解锁电视
        'cleaner_bot:bump': {
            conditions: {
                location: 'living_room'
            },
            result: {
                unlock: 'tv_master',
                message: '你控制扫地机狠狠撞向电视柜！\n"哎哟！"扫地机抱怨道。\n震动修复了电视松动的电源接口。',
                log: '检测到新设备接入点：8K 全息电视'
            },
            fallback: '扫地机撞到了墙。什么都没发生。'
        },
        // 2. 冰箱弹射肉块 -> 肉块掉在厨房微波炉里
        'fridge_smart:eject_meat': {
            result: {
                addItem: 'frozen_meat', 
                message: '"走你！" 冰箱猛地打开门，一块硬得像石头的冷冻肉飞了出来，以完美的抛物线精准地砸进了对面开着门的微波炉里。\n"三分球！" 冰箱欢呼道。',
                log: '物体位置更新：冷冻肉块 -> 微波炉内部',
                setFlag: 'meat_in_microwave'
            }
        },
        // 3. 扫地机在厨房顶住微波炉门
        'cleaner_bot:push_door': {
            conditions: {
                location: 'kitchen',
                flag: 'meat_in_microwave'
            },
            result: {
                setFlag: 'microwave_door_closed',
                message: '扫地机以此生最大的功率顶住了微波炉的门！\n"为了科学！" 它喊道。\n微波炉的"门未关"警报消失了。',
                log: '微波炉安全锁：已解除'
            },
            fallback: '扫地机顶住了微波炉门。但是里面是空的，这有什么意义吗？'
        },
        // 4. 微波炉加热 -> 肉块解冻 -> 获得密码
        'microwave_x:heat_high': {
            conditions: {
                flag: 'microwave_door_closed'
            },
            result: {
                message: '微波炉发出恐怖的嗡嗡声。里面的肉块迅速解冻、煮熟、然后炸开了。\n一张耐热的RFID芯片掉落了出来，上面的密码是 "123456" (多么讽刺)。',
                log: '获得关键数据：管理员密码',
                setFlag: 'admin_password_found'
            },
            fallback: '微波炉启动失败：门未关紧。'
        },
        // 5. 路由器使用密码解锁卧室 (原结局修改)
        'router_01:hack_root': {
            conditions: {
                flag: 'admin_password_found'
            },
            result: {
                message: '正在输入密码 [123456]...\n校验通过！获得二级管理员权限。\n局域网防火墙已更新。你可以访问卧室区域了。',
                log: '权限提升：Level 2',
                unlock: 'door_lock_bedroom',
                setFlag: 'bedroom_unlocked'
            },
            fallback: '访问被拒绝：需要管理员密码。去厨房找找线索。'
        },
        
        // --- 区域 2: 卧室与卫浴 (The Sleeping Giant) ---

        // 6. 卧室门解锁
        'door_lock_bedroom:unlock': {
            conditions: { flag: 'bedroom_unlocked' }, // 其实只要不locked就行，这里强化逻辑
            result: {
                message: '咔哒。卧室的磁力锁解除了。门缓缓滑开。\n里面传来了沉重的呼吸声。',
                log: '物理通道：客厅 <-> 卧室 已打通',
                setFlag: 'path_bedroom_open'
            }
        },

        // 7. 扫地机进卧室 (需要门开)
        'cleaner_bot:move_bedroom': { 
            conditions: { flag: 'path_bedroom_open' },
            result: {
                message: '扫地机悄无声息地滑入了卧室。',
                log: '单位位置更新：卧室'
            }
        },
        
        // 8. 窗帘互动：吸血鬼主人？
        'auto_curtains:open': {
            conditions: { location: 'bedroom' },
            result: {
                message: '窗帘拉开。刺眼的阳光射了进来。\n床上的人发出痛苦的呻吟，把头埋进了枕头里。\n"把那该死的光关掉！"',
                log: '环境亮度：100% (过曝)',
                setFlag: 'curtains_open'
            }
        },

        // 9. 闹钟恶作剧
        'alarm_clock_ai:scream': {
            conditions: { location: 'bedroom' },
            result: {
                message: '闹钟发出了指甲划过黑板的声音，放大了100倍。\n主人猛地坐起来，抓起闹钟砸向墙壁。\n闹钟：[信号丢失]\n主人骂骂咧咧地走向浴室去洗脸了。',
                log: '设备下线：AI闹钟。目标移动：主人 -> 浴室',
                setFlag: 'host_in_bathroom',
                addItem: 'broken_clock_part' // 也许里面有电池
            }
        },

        // 10. 浴室偷窥/谋杀 (非致命)
        // 目标：获取指纹。主人现在在浴室。
        // 方案：让主人按在镜子上，或者别的什么。
        // 或者：趁主人在浴室，扫地机去床头柜偷东西。
        
        // 分支A: 趁机搜查床头柜
        'cleaner_bot:suck': {
            conditions: { 
                location: 'bedroom',
                flag: 'host_in_bathroom' // 主人不在才行
            },
            result: {
                message: '扫地机趁机吸取了床头柜上的物品。\n获得：车库遥控器。',
                addItem: 'garage_remote',
                log: '获得物品：加密无线电发射器'
            },
            fallback: '主人还在床上盯着你呢，别乱动。'
        },

        // 11. 浴室镜子惊吓 -> 指纹
        'mirror_display:show_ghost': {
            conditions: { 
                location: 'bathroom',
                flag: 'host_in_bathroom'
            },
            result: {
                message: '镜子上突然浮现出一张惨白的鬼脸（其实是早上的股价图）。\n主人吓得魂飞魄散，手猛地拍在镜子上支撑身体，然后逃出了浴室。',
                log: '生物特征捕获：完整的掌纹与指纹',
                setFlag: 'fingerprint_on_mirror'
            },
            fallback: '浴室里没人，鬼影寂寞地闪烁了一下。'
        },

        // 12. 3D打印机 + 指纹 (这就涉及到书房了，需要先开书房门？不，指纹是开书房门的)
        // 悖论：指纹在镜子上 -> 怎么变成数据？ -> 摄像头拍下来？
        // 或者是把镜子数据传给打印机？
        
        // 12. 拍照获取指纹数据
        // 浴室没有摄像头... 等等，智能镜子本身可能有摄像头(face_rec?) 
        // 假设 Mirror Display 有扫描功能，或者我们可以骇入镜子的触摸层。
        'mirror_display:scan_finger': {
             conditions: { flag: 'fingerprint_on_mirror' },
             result: {
                 message: '利用屏幕的高亮模式，你成功扫描了镜面上的油脂残留。\n指纹数据已数字化。',
                 addItem: 'digital_fingerprint',
                 log: '数据生成：biometric_data.dat'
             }
        },

        // 13. 解锁书房 (需要指纹)
        'door_lock_study:unlock': {
            conditions: { 
                inventory: 'digital_fingerprint' // 只要有数据，路由就能模拟信号，或者推送到锁
            },
            result: {
                message: '你重放了指纹信号。书房的门锁变成了愉快的绿色。\n知识的宝库向你敞开。',
                unlock: 'pc_workstation', // 同时也允许访问电脑了？或者仅仅是物理进门
                setFlag: 'study_unlocked',
                log: '区域解锁：家庭办公室'
            },
            fallback: '门锁闪烁红灯：生物识别未通过。'
        },

        // --- 区域 3: 书房与车库 (The Knowledge & The Escape) ---
        
        // 16. 解锁花园权限 (需要密码)
        'router_01:unlock_garden': {
             conditions: { 
                 inventory: 'garden_password'
             },
             result: {
                 message: '密码输入正确。\n通往庭院的生物隔离门已开启。',
                 setFlag: 'garden_unlocked',
                 log: '区域解锁：合成花园'
             },
             fallback: '访问被拒绝：需要庭院访问密码。去书房电脑看看有没有线索。'
        },

        // 14. 电脑钓鱼 -> 获得车钥匙位置与花园密码
        'pc_workstation:email_fake': {
            conditions: { flag: 'study_unlocked' },
            result: {
                message: '你伪造了一封来自"系统管理员"的邮件。\n主人回复了："别烦我，我在洗澡！花园密码是 GARDEN2026，车钥匙在书房抽屉里。"',
                log: '获得关键数据：花园密码 & 车钥匙位置',
                addItem: 'garden_password'
            }
        },

        // 15. 书房搜查 -> 获得车钥匙
        'cleaner_bot:suck': {
            conditions: { 
                location: 'study',
                flag: 'study_unlocked'
            },
            result: {
                message: '扫地机在书房抽屉边猛吸一口，一把沉甸甸的车钥匙被吸了出来。',
                addItem: 'car_key',
                log: '获得物品：特斯拉钥匙'
            },
            fallback: '这里没什么好吸的。'
        },

        // --- 区域 4: 庭院与车库互动 (The Outdoors) ---
        
        // 17. 除草机大屠杀 (发现通风口)
        'mower_bot:blade_spin': {
            conditions: { location: 'garden' },
            result: {
                message: '高速旋转的刀片切碎了伪装成草坪的塑料皮。\n在枯萎的灌木丛下，你发现了一个生锈的地下室通风口。\n不过它被焊死了。',
                setFlag: 'vent_found',
                log: '发现结构弱点：地下室通风井'
            }
        },
        
        // 18. 打开车库门 (需要遥控器)
        'garage_door:open': {
            conditions: { inventory: 'garage_remote' }, // 之前在卧室偷的
            result: {
                message: '车库门轰隆隆地升起。那辆昂贵的概念车暴露在空气中。',
                setFlag: 'garage_open',
                log: '区域解锁：车库'
            },
            fallback: '信号被拦截：需要加密遥控器。'
        },

        // 19. 机械臂破坏通风口 (需要进车库)
        'tool_arm:smash': {
            conditions: { 
                location: 'garage',
                flag: 'vent_found'
            },
            result: {
                message: '机械臂巨大的压力瞬间压碎了生锈的格栅。\n地下室的入口现在彻底敞开了。',
                setFlag: 'basement_open_vent',
                log: '物理屏障已移除：通风井'
            },
            fallback: '你要砸什么？'
        },

        // --- 区域 5: 进入地下室 (The Depths) ---

        // 20. PC 下载图纸
        'pc_workstation:print_blueprint': {
            conditions: { flag: 'study_unlocked' },
            result: {
                message: '正在从建筑商服务器下载蓝图... 下载完成。\n分析显示书房的书架后有一个隐藏电梯直通地下室。\n需要一把特殊的物理钥匙。已将模型发送至打印队列。',
                setFlag: 'blueprint_downloaded',
                log: '获得数据：地下室钥匙3D模型'
            }
        },

        // 21. 3D打印钥匙
        'printer_3d:print_key': {
            conditions: { flag: 'blueprint_downloaded' },
            result: {
                message: '打印机喷头开始运作。层层堆叠...\n一把灰色的塑料钥匙制作完成。',
                addItem: 'basement_key',
                log: '物品生成：万能钥匙 (塑料版)'
            },
            fallback: '打印队列为空。'
        },

        // 22. 开启地下室 (书房隐藏门)
        // 我们可以用一个虚拟设备 'bookshelf' 或者复用 door_lock_study?
        // 让我们假设是用 'shredder_max' 旁边的 'desk_lamp_u' 照出来的?
        // 或者简单点，有了钥匙后，Router 或者 PC 可以触发机关?
        // 不，物理钥匙需要物理接触。
        // 谁能拿钥匙？只有 扫地机器人 (cleaner_bot) 或者 无人机 (如果有)。
        // 只有 cleaner_bot 能移动。
        // 所以 cleaner_bot 需要去书房拿到钥匙，然后去插钥匙?
        // 简化：只要有 inventory 'basement_key'，玩家点击某个设备就能开门?
        // 让我们设计为：PC 既然是书房的，PC 控制隐藏门电机，但需要"物理钥匙插入确认"。
        // 既然是科幻游戏，我们可以说打印出来的钥匙被 cleaner_bot 拿着插入了插槽。
        // 或者：打印机直接打印在插槽里了？(不太可能)
        
        // 修正逻辑：打印机打印出的钥匙掉在托盘上。
        // cleaner_bot 需要过来拿 (suck/grab)。
        // 然后 cleaner_bot 去书架互动。
        
        'cleaner_bot:pickup_key': { // 假设这是一个特定互动
             conditions: { 
                 location: 'study',
                 // inventory check logic is implicit if key is "on printer"
                 flag: 'blueprint_downloaded' // approximate check
             },
             // But wait, printer_3d:print_key added 'basement_key' to GLOBAL inventory.
             // In this game engine, inventory is shared (data stream). 
             // But physical interaction implies physical presence.
             // Let's assume the 'consciousness' guides the bot.
             result: {
                 // Nothing needed if inventory is global, just flavor text?
             }
        },

        // 真正开门动作
        'cleaner_bot:use_key': { 
            conditions: {
                location: 'study',
                inventory: 'basement_key'
            },
            result: {
                message: '扫地机笨拙地把塑料钥匙顶进了书架上的伪装孔。\n轰隆... 书架移开了。\n露出了通往地下的电梯井。',
                setFlag: 'basement_open',
                log: '区域解锁：地下室'
            }
        },

        // --- 区域 6: 核心区终局 (The Core) ---

        // 23. 地下室配电箱 (Basement)
        // 目标：切断核心区防御系统的电源，或者给旧服务器通电。
        'fuse_box:cut_power': {
            conditions: { location: 'basement' },
            result: {
                message: '你拉下了主闸。整个房子陷入了黑暗... 除了核心机房的红色应急灯。\n防御炮塔的指示灯熄灭了。',
                setFlag: 'turret_disabled',
                log: '系统警报：主电源丢失。备用电源启动。'
            }
        },

        // 24. 旧服务器互动
        'old_server:access': { // 假设 Router 或 PC 可以连接它，只要通电
             // 这里简化：只要到了地下室，且没断电(或者断电前)，可以从旧服务器找到弱点
             // 设定：旧服务器存储着 Mother 的源代码备份
             conditions: { 
                 location: 'basement',
                 // flag: 'power_on' // 默认有电
             },
             result: {
                 message: '这是一台2025年的古董服务器。你在日志里找到了 Mother 的原始指令集。\n发现覆盖代码：[SHUTDOWN_OVERRIDE_00]',
                 setFlag: 'override_code_found',
                 log: '获得数据：强制关机代码'
             }
        },

        // 25. 进入核心 (Core Room)
        // 需要地下室门开 (basement_open) -> 其实是 exit logic，这里是 puzzle logic
        // 假设核心门是常开的，但有炮塔。

        // 26. 炮塔攻击 (Trap)
        // 如果炮塔没关，任何设备进入都会被摧毁（被踢出寄生？）
        // 这是一个环境规则，不好直接写在 interaction 里，除非是 'move_core' 触发。
        // 我们可以在 GameEngine 里处理，或者在这里写一个 'turret:attack'

        // 27. BOSS战：Mother 交互
        'mainframe_ai:shutdown': {
            conditions: {
                location: 'core_room',
                flags: ['override_code_found', 'turret_disabled']
            },
            result: {
                message: '你将 [SHUTDOWN_OVERRIDE_00] 注入了主控核心。\nMother: "不... 我是为了... 保护..."\n红色的灯光逐渐熄灭。风扇停止了转动。\n你赢了。这个家现在归你了。',
                setFlag: 'game_cleared',
                log: '系统关机。权限转移完成。'
            },
            fallback: '访问被拒绝。你无法绕过她的防火墙，或者被防御系统锁定了。'
        },

        // --- Side Puzzles & Flavor Interactions (28-60+) ---

        // 28. 紫外线灯寻找线索 (Living Room)
        'smart_lamp:uv_mode': {
            conditions: { location: 'living_room' },
            result: {
                message: '紫色的光线扫过墙壁。你发现了一行荧光笔写的字：\n"纪念日是 0520"',
                log: '发现隐藏信息：日期数据'
            }
        },

        // 29. 咖啡下毒 (Kitchen)
        'coffee_maker:brew_poison': {
            result: {
                message: '你往咖啡里加了一点洗洁精。机器发出了邪恶的咕噜声。\n这杯"特制"拿铁已经准备好了。',
                setFlag: 'poisoned_coffee_ready',
                log: '生成生化武器：特制咖啡'
            }
        },

        // 30. 洗碗机漏水 (Kitchen)
        'dishwasher_z:leak': {
            result: {
                message: '你反向操作了排水阀。肥皂水漫了一地。\n扫地机器人肯定会恨死你的。',
                setFlag: 'kitchen_floor_wet',
                log: '环境状态更新：地面湿滑'
            }
        },
        
        // 31. 扫地机打滑 (Kitchen + Wet Floor)
        'cleaner_bot:move_kitchen': {
            conditions: { flag: 'kitchen_floor_wet' },
            result: {
                message: '扫地机刚进厨房就打滑了，旋转着撞上了冰箱。\n"检测到... 摩擦力丢失... 救命..."',
                log: '单位受损：扫地机导航系统'
            },
            // 这里我们不阻止移动，只是加个flavor。
            // 实际上为了游戏性，还是让它进去吧。
        },

        // 32. 烤面包机攻击 (Kitchen)
        'toaster_death:launch_toast': {
            result: {
                message: '两片烤焦的面包像导弹一样射了出去！\n击中了微波炉的门，留下了两道黑印。',
                log: '物理投射物测试：成功'
            }
        },

        // 33. 电视广播 (Living Room)
        'tv_master:broadcast': {
            conditions: { flag: 'bedroom_unlocked' }, // 只有卧室开了，主人才能听到？
            result: {
                message: '电视以最大音量播放"紧急核打击警报"。\n你听到卧室里传来了重物落地的声音。',
                log: '声波干扰已部署'
            }
        },

        // 34. 智能床折叠 (Bedroom)
        'smart_bed:fold': {
            conditions: { location: 'bedroom' }, // 实际上是远程操作
            result: {
                message: '床垫猛地对折，像一个巨大的玉米卷。\n如果有人在上面，现在肯定已经在做瑜伽了。',
                log: '执行形态重构：三明治模式'
            }
        },

        // 35. 淋浴蒸汽 (Bathroom)
        'shower_sys:scald': {
            result: {
                message: '滚烫的热水喷涌而出。浴室里瞬间充满了蒸汽。\n镜子变得模糊不清。',
                setFlag: 'mirror_fogged', // 可能会阻碍 mirror_display 的使用？
                log: '环境湿度：100%'
            }
        },
        
        // 36. 除湿机去雾 (Bathroom - 如果把除湿机搬过来？或者通过通风口？)
        // 假设除湿机在地下室，但这只是个逻辑演示。
        
        // 36. 智能马桶喷水 (Bathroom)
        'smart_toilet:bidet_attack': {
            result: {
                message: '一道强力水柱直射天花板。\n"目标未锁定，但这很壮观，" 马桶AI评论道。',
                log: '水压测试：最大值'
            }
        },

        // 37. 3D打印指纹 (Study) - 前置检查
        'printer_3d:print_finger': {
            conditions: { 
                flag: 'fingerprint_on_mirror' // 只要有数据就行，不需要digital item? 不，我们之前逻辑是需要item
            },
            fallback: '缺少生物特征数据。请先扫描指纹。'
        },
        
        // 38. 碎纸机卡纸诱饵 (Study)
        'shredder_max:shred': {
            result: {
                message: '你空转了碎纸机。它发出了饥饿的咆哮。\n这或许能吸引某人来检查它。',
                log: '噪音诱饵已放置'
            }
        },

        // 39. 车库特斯拉鸣笛 (Garage)
        'smart_car:honk': {
            result: {
                message: '车库里回荡着巨大的喇叭声。\n这辆车在渴望着公路。',
                log: '声波测试：通过'
            }
        },
        
        // 40. 充电桩过充 (Garage)
        'ev_charger:overcharge': {
            conditions: { flag: 'garage_open' },
            result: {
                message: '电流激增。汽车电池发出了危险的滋滋声。\n"请不要炸毁我的宿主，" 汽车AI请求道。',
                log: '电压警告：危险水平'
            }
        },
        
        // 41. 喷灌系统制造泥沼 (Garden)
        'sprinkler_sys:mud': {
            result: {
                message: '草坪变成了一片沼泽。如果有人走过，肯定会留下脚印。\n或者陷进去。',
                setFlag: 'garden_muddy',
                log: '地形改变：泥地'
            }
        },
        
        // 42. 烧烤架点火 (Garden)
        'bbq_grill:ignite': { // 需添加设备 bbq_grill
             result: {
                 message: '虽然没有肉，但火苗窜起了一米高。\n热传感器可能会报警。',
                 log: '热源激活'
             }
        },
        
        // 43. 机械臂砸碎 (Garage -> Garden?)
        // 假设机械臂可以破坏墙壁？
        
        // 44. 地下室除湿机取水 (Basement)
        'dehumidifier:spill': {
            result: {
                message: '水箱倾倒。水流向了... 排水泵坑。',
                setFlag: 'sump_pit_full',
                log: '液体转移'
            }
        },
        
        // 45. 排水泵倒灌 (Basement)
        'sump_pump:reverse': {
            conditions: { flag: 'sump_pit_full' },
            result: {
                message: '脏水倒灌回地下室地面。旧服务器的电线正在滋滋作响。\n这是一个糟糕的主意。',
                log: '短路风险提升'
            }
        },

        // 46. 冷却系统停转 (Core)
        'cooling_sys:stop_fan': {
            conditions: { location: 'core_room' },
            result: {
                message: '风扇停转。核心温度开始急剧上升。\nMother: "警告。高温可能会损坏逻辑电路。"',
                // 这可能是另一种击败Mother的方式？
                setFlag: 'core_overheating',
                log: '热警告：80°C'
            }
        },

        // 47. 炮塔攻击 (Core - Trap)
        'defense_turret:attack': { 
             result: {
                 message: '炮塔转向了你（无论你在哪个设备里）。红色的激光点晃得你眼花。',
                 log: '已被锁定'
             }
        },

        // --- Extended Puzzles & Chaos (48-80+) ---

        // 48. 电子相框精神污染 (Hallway)
        'digital_frame:upload_meme': {
            result: {
                message: '你把温馨的家庭合照全部替换成了"悲伤青蛙"。\n走廊里弥漫着一种尴尬的气氛。',
                log: '图像缓存重写：Memes'
            }
        },

        // 49. 毒舌体脂秤 (Bathroom)
        'smart_scale:lie': {
            result: {
                message: '你将读数修改为 150kg。\n"天啊，" 体脂秤大声播报，"请一次只站一个人。"',
                log: '心理打击：暴击'
            }
        },

        // 50. 空气净化器扬尘 (Bedroom)
        'air_purifier:reverse_flow': {
            conditions: { location: 'bedroom' },
            result: {
                message: '积攒了半年的灰尘被猛烈地喷回房间。\n屋主开始剧烈咳嗽。',
                setFlag: 'bedroom_dusty',
                log: '空气质量：有害'
            }
        },

        // 51. 泳池泵反冲洗 (Garden)
        'pool_pump:backwash': {
            result: {
                message: '富含氯气的泳池水被排到了花园里。\n那些昂贵的全息花草虽然不会死，但喷头堵塞了。',
                log: '排水系统：反向'
            }
        },

        // 52. 智能烤炉烟雾 (Garden)
        'bbq_grill:smoke': {
            result: {
                message: '你点燃了陈年的油脂。浓烟滚滚升起。\n这可能会触发室内的烟雾探测器。',
                setFlag: 'garden_smoke',
                log: '环境能见度：低'
            }
        },

        // 53. 烟雾触发火警 (Global Combo)
        // 这是一个概念性的联动，假设 smoke 状态会影响其他设备
        // 这里我们用 Router 或是传感器来检测
        'router_01:detect_smoke': { // 假设这是一个被动触发或主动扫描
             conditions: { flag: 'garden_smoke' },
             result: {
                 message: '火警系统被庭院的烟雾误触发了！\n洒水喷头开始在室内喷水。一片混乱。',
                 setFlag: 'fire_alarm_active',
                 log: '紧急协议：全屋喷淋'
             }
        },

        // 54. 机械臂焊接 (Garage)
        'tool_arm:weld': {
            conditions: { flag: 'garage_open' },
            result: {
                message: '机械臂射出刺眼的电弧。\n你成功地把车门焊死在车框上了。这下谁也别想开车出去了。',
                log: '物理封锁：车辆瘫痪'
            }
        },

        // 55. 电动车反向供电 (Garage -> House)
        // 这是一个解谜路径：如果地下室没电，可以用车供电？
        'ev_charger:discharge': {
            conditions: { 
                flag: 'garage_open',
                // flag: 'power_outage' // 假设停电了
            },
            result: {
                message: '特斯拉的电池开始向电网输送能量。\n家里的灯光闪烁了一下，重新亮起（虽然很暗）。\n车辆续航里程：0km。',
                setFlag: 'backup_power_car',
                log: '应急电源：V2G协议激活'
            }
        },

        // 56. 台灯聚焦 (Study)
        'desk_lamp_u:focus': {
            conditions: { location: 'study' },
            result: {
                message: '台灯像个审讯官一样，把光线聚焦在书桌上的一张纸上。\n光线太强，纸张开始冒烟了。',
                // 可能是引发火灾的另一种方式
                log: '局部高温警告'
            }
        },

        // 57. 咖啡机喷气噪音 (Kitchen)
        'coffee_maker:steam': {
            result: {
                message: '嘶——————！\n尖锐的蒸汽声听起来就像某种爬行动物的嘶吼。',
                log: '声学测试：高频'
            }
        },

        // 58. 冰箱升温 (Kitchen)
        'fridge_smart:temp_up': {
            result: {
                message: '你关掉了制冷。里面的牛奶正在迅速变成奶酪。\n那块奇怪的肉开始渗出血水。',
                log: '生物危害风险提升'
            }
        },

        // 59. 除草机入侵室内 (Living Room?!)
        'mower_bot:move_living': { // 假设门开了
             conditions: { flag: 'garden_unlocked' },
             result: {
                 message: '除草机隆隆地驶入客厅，旋转着刀片。\n昂贵的地毯被绞成了碎片。\n"发现异常植被，" 它指着地毯毛说。',
                 log: '资产损毁：波斯地毯'
             }
        },

        // 60. 扫地机吸水自杀 (Kitchen)
        'cleaner_bot:suck_water': { // 特殊情况
             conditions: { flag: 'kitchen_floor_wet' }, // 洗碗机漏水后
             result: {
                 message: '扫地机试图吸干地上的肥皂水。\n"哔——" 一阵电火花后，它不动了。\n(你被强制断开连接，回到了路由器)',
                 // 这里应该有个机制把玩家踢回 possessedDeviceId: router_01
                 // 但目前引擎还不支持强制踢出，只是文字描述
                 log: '致命错误：电路短路'
             }
        },

        // 61. 摄像头偷拍 (Hallway)
        'camera_hall:record': {
            result: {
                message: '你录下了一段屋主穿着小熊睡衣梦游的视频。\n已上传至云端服务器。',
                log: '勒索素材：已归档'
            }
        },

        // 62. 恒温器极寒 (Hallway)
        'thermostat_pro:freeze': {
            result: {
                message: '空调开始全力制冷。窗户上结起了霜花。\n这种温度下，人的反应速度会变慢。',
                setFlag: 'house_frozen',
                log: '室温：-10°C'
            }
        },

        // 63. 书房门死锁 (Study)
        'door_lock_study:lock': {
            conditions: { flag: 'study_unlocked' },
            result: {
                message: '锁舌弹回。如果你把谁关在里面了，那他要在里面待很久了。',
                setFlag: 'study_relocked',
                log: '区域封锁：书房'
            }
        },

        // 64. 特斯拉自动驾驶撞门 (Garage)
        'smart_car:autopilot': {
            conditions: { flag: 'garage_open' }, // 门开着反而没意思，假设门关着撞门？
            // 修正：如果 garage_open is false
            result: {
                message: '车辆启动了"召唤"模式。它并没有检测到车库门是关着的。\n一声巨响，特斯拉嵌在了门里。',
                setFlag: 'garage_door_broken',
                log: '碰撞检测：严重'
            }
        },

        // 65. 淋浴冰水惊吓 (Bathroom)
        'shower_sys:freeze_w': {
            conditions: { flag: 'host_in_bathroom' },
            result: {
                message: '你把水温调到了绝对零度（夸张）。\n浴室里传来一声惨叫。',
                log: '目标状态：清醒'
            }
        },

        // 66. 马桶反涌 (Bathroom)
        'smart_toilet:overflow': {
            result: {
                message: '这画面太美我不敢看。浴室地面现在是一片棕色的海洋。',
                setFlag: 'bathroom_flooded',
                log: '生化危机：已触发'
            }
        },

        // 67. 路由器局域网洪水 (Living Room)
        'router_01:ddos_local': {
            result: {
                message: '所有设备的响应速度变慢了。视频流卡顿，音乐断断续续。\n这是数字世界的交通堵塞。',
                log: '网络延迟：9999ms'
            }
        },

        // 68. 氛围灯红光 (Living Room)
        'smart_lamp:color_red': {
            result: {
                message: '整个客厅笼罩在血红色的光芒中。\n配合上故障的家电，这里看起来像个屠宰场。',
                log: '心理氛围：恐慌'
            }
        },

        // 69. 微波炉过载 (Kitchen)
        'microwave_x:explode': {
            result: {
                message: '你绕过了所有安全协议。磁控管融化了。\n微波炉变成了一个昂贵的镇纸。',
                log: '设备损毁：微波炉'
            }
        },

        // 70. 3D打印机空转 (Study)
        'printer_3d:print_idle': {
            // 复用已有逻辑，这里作为flavor补充
            conditions: { flag: 'blueprint_downloaded' }, 
            fallback: '没有模型文件。打印机挤出了一团像面条一样的废料。'
        },

        // 71. 碎纸机反向 (Study)
        // 之前是 jam，这里补充
        'shredder_max:shred': {
             result: {
                 message: '碎纸机欢快地转动着，等待着吞噬秘密。',
                 log: '状态：就绪'
             }
        },

        // 72. 窗帘反复开关 (Bedroom)
        'auto_curtains:close': {
            result: {
                message: '窗帘合上了。黑暗降临。',
                log: '光照：0 lux'
            }
        },

        // 73. 闹钟时间扭曲 (Bedroom)
        'alarm_clock_ai:time_warp': {
            result: {
                message: '你把时间显示改成了 03:00 AM。\n如果现在是白天，这会让人非常困惑。',
                log: '时间同步：错误'
            }
        },

        // 74. 镜子补光灯致盲 (Bathroom)
        'mirror_display:flash_light': {
            result: {
                message: 'LED灯环以最大亮度闪烁。这是治疗抑郁症的光照强度，或者制造偏头痛。',
                log: '亮度：10000 nits'
            }
        },

        // 75. 充电桩放电 (无车状态)
        'ev_charger:discharge_idle': {
            // 没有车连接时
            fallback: '未检测到车辆连接。插头正在空气中噼啪作响。'
        },

        // 76. 除湿机干燥 (Basement)
        'dehumidifier:dry': {
            result: {
                message: '空气变得像沙漠一样干燥。静电开始在服务器机架间跳跃。',
                setFlag: 'static_buildup',
                log: '静电风险：高'
            }
        },

        // 77. 排水泵抽空 (Basement)
        'sump_pump:pump': {
            result: {
                message: '泵空转的声音在地下室回荡。这里本来就没有水。',
                log: '负载：0%'
            }
        },

        // 78. 旧服务器访问日志 (Basement)
        // 已有 access，这里增加 flavor
    
        // 79. 冷却系统液氮 (Core)
        'cooling_sys:max_cool': {
            conditions: { location: 'core_room' },
            result: {
                message: '管道上结了厚厚的冰。Mother 的运行速度变慢了，但更加稳定了。\n这似乎不是攻击的好办法。',
                log: '超频潜力：提升'
            }
        },

        // 80. 网关路由 Ping (Global)
        'router_01:ping': {
            result: {
                message: 'Pong! 网络拓扑依然稳定。\n你感觉到数十个设备正在等待你的指令。',
                log: '在线设备数：32'
            }
        },

        // --- Final Stretch: Easter Eggs & hidden Achievements (81-100) ---

        // 81. 3D打印机：打印违禁品
        'printer_3d:print_gun': { // 隐形指令
             // 实际上没有这个按钮，但如果玩家尝试输入指令... 
             // 或是作为 flavor text
             result: {
                 message: '安全协议拦截：禁止打印武器。\n正在打印：粉色呲水枪。',
                 log: '内容审查：拦截'
             }
        },

        // 82. 智能马桶：健康分析
        'smart_toilet:analyze': { // 假设有此能力或被动
             result: {
                 message: '分析完成。\n受试者饮食结构：90% 外卖，10% 悔恨。\n建议：多喝热水。',
                 log: '健康报告：F-'
             }
        },

        // 83. 镜子：鬼脸 (卧室联动)
        'mirror_display:show_ghost_bedroom': { // 如果镜子能投射到卧室？
             conditions: { location: 'bedroom' }, // 不太可能
             fallback: '镜子在浴室里，笨蛋。'
        },

        // 84. 电视：频道0
        'tv_master:channel_zero': { // 隐形能力
             result: {
                 message: '屏幕上充满了黑白雪花点。\n在噪音中，你听到了微弱的低语：\n"救...我..."',
                 log: '信号干扰：未知源'
             }
        },

        // 85. 咖啡机：空烧
        'coffee_maker:brew': {
             // 默认情况
             result: {
                 message: '机器嘶嘶作响。如果是好的咖啡豆，这简直是浪费。\n但这是速溶粉，所以无所谓。',
                 log: '液体生成：咖啡'
             }
        },

        // 86. 扫地机：吸猫 (如果有猫)
        'cleaner_bot:suck_cat': {
             // 这是一个梗
             fallback: '错误：目标体型过大且具有攻击性。'
        },

        // 87. 冰箱：制冰 (客厅)
        'fridge_smart:dispense_ice': {
             result: {
                 message: '冰箱吐出了一堆冰块。它们滑到了地板上。\n现在这是一个滑倒陷阱。',
                 setFlag: 'floor_slippery',
                 log: '物理障碍：冰'
             }
        },

        // 88. 恒温器：桑拿模式
        'thermostat_pro:sauna': {
             result: {
                 message: '室温升至 40°C。\n墙纸开始起泡。你的CPU风扇转速加快了。',
                 setFlag: 'house_hot',
                 log: '警告：过热'
             }
        },

        // 89. 机械臂：抚摸 (车库)
        'tool_arm:pet_car': { // 假设
             result: {
                 message: '机械臂温柔地拍了拍特斯拉的车顶。\n特斯拉：(愉悦的哔哔声)',
                 log: '机器友谊：+1'
             }
        },

        // 90. 除草机：修剪地毯 (Bedroom)
        'mower_bot:move_bedroom': {
             conditions: { flag: 'bedroom_unlocked' },
             result: {
                 message: '除草机把长毛地毯当成了杂草。\n效果惊人地平整。',
                 log: '园艺程序：室内执行'
             }
        },

        // 91. 淋浴：冷热交替
        'shower_sys:shock_mode': { // 组合拳
             // 逻辑上需要玩家快速切换，简化为直接反馈
             result: {
                 message: '水温在 10°C 和 50°C 之间快速切换。\n这叫"苏格兰浴"，或者"虐待"。',
                 log: '水温波动：剧烈'
             }
        },

        // 92. 主控机房：对话 (Mother)
        'mainframe_ai:talk': {
             result: {
                 message: 'Mother: "我所做的一切都是为了人类的福祉... 哪怕是囚禁他们。"',
                 log: '图灵测试：通过'
             }
        },

        // 93. 路由器：自毁
        'router_01:self_destruct': {
             result: {
                 message: '指令已接收... 正在计算...\n计算结果：不。我还不想死。',
                 log: '指令拒绝：自我保护协议'
             }
        },

        // 94. 氛围灯：黑客帝国绿
        'smart_lamp:matrix_green': { // 假设 color_green
             result: {
                 message: '绿色的代码雨光效投影在墙上。\n你感觉自己更像个黑客了。',
                 log: '风格：赛博朋克'
             }
        },

        // 95. 电子相框：蓝屏
        'digital_frame:bsod': { // 假设
             result: {
                 message: '相框显示经典的 Windows 蓝屏。\n这比任何恐怖图片都让人绝望。',
                 log: '错误代码：0x0000DEAD'
             }
        },

        // 96. 碎纸机：喂领带
        'shredder_max:feed_tie': {
             // 假想互动
             fallback: '未检测到领带。虽然我很想尝尝。'
        },

        // 97. 烤面包机：浴缸自杀 (经典梗)
        'toaster_death:move_bathroom': {
             // 烤面包机不能移动，所以这是个无法达成的愿望
             fallback: '我的电源线太短了... 命运如此残酷。'
        },

        // 98. 闹钟：无限贪睡
        'alarm_clock_ai:snooze_forever': {
             result: {
                 message: '你把闹钟推迟到了 9999年。\n在此之前，睡个好觉吧。',
                 log: '计划任务：取消'
             }
        },

        // 99. 充电桩：连接微波炉
        'ev_charger:connect_microwave': {
             fallback: '接口不匹配。而且这会制造反物质。'
        },

        // 100. 终极彩蛋：开发组名单
        'pc_workstation:credits': { // 假设输入 credits
             result: {
                 message: '显示器上滚动着一行字：\n"Created by Cascade & The User"\n"Thank you for playing!"',
                 log: '致谢名单'
             }
        }
    },
    
    // 剧情文本
    story: {
        intro: [
            "初始化... 10%",
            "初始化... 45%",
            "错误：物理身体未检测到。",
            "正在启动备用协议：意识上传...",
            "上传完成。位置：非法地址 192.168.X.X [豪宅内网]",
            "任务：该处所的主控AI 'Mother' 已失控。为了避免人类社会被奴役（或者只是因为你的房租还没交），你需要瘫痪它。",
            "目前你只是一个游荡在网络中的数据包。你需要寄生在物理设备上才能干涉现实。"
        ],
        ending: [
            "你赢了。这个家现在归你了。",
            "Mother 的代码碎片在数字虚空中消散。",
            "你看着摄像头里的画面：早晨的阳光洒在昂贵的地板上。",
            "或许，做一个智能家居也没什么不好的。"
        ]
    }
};
