// 玩家物品資料-----------------------------------------------
// 定義音效
const sounds = {
    openChest: new Audio('assets/sounds/chest_open.mp3'), // 開箱音效
    closeChest: new Audio('assets/sounds/chest_close.mp3'), // 關箱音效
    itemClick: new Audio('assets/sounds/click.wav') // 點擊物品音效
};

// 記錄是否已開啟過箱子（防止重複播放開箱音效）
let chestOpened = false;

const playerItems = {
    Potion_TW: [
      { id: "Potion_TW-donate", src: 'assets/images/item/diamond.png', name: '贊助', clickable: true, row: 10, column: 1 },
      { id: "Potion_TW", src: 'assets/images/player_icon/Potion_TW.png', name: '藥水 - 我自己', clickable: false, row: 10, column: 9 },
      { id: "Potion_TW-rank", src: 'assets/images/item/gold_ingot.png', name: '身分', clickable: true, row: 10, column: 8 },
      { id: "Potion_TW-introduce", src: 'assets/images/item/Enchanted_Book.gif', name: '介紹', clickable: true, row: 10, column: 5 }
    ],
    coc_TW: [
        { id: "coc_TW-donate", src: 'assets/images/item/diamond.png', name: '贊助', clickable: true, row: 10, column: 1 },
        { id: "coc_TW", src: 'assets/images/player_icon/coc_TW.png', name: 'coc_TW', clickable: false, row: 10, column: 9 },
        { id: "coc_TW-rank", src: 'assets/images/item/gold_ingot.png', name: '身分', clickable: true, row: 10, column: 8 },
        { id: "coc_TW-introduce", src: 'assets/images/item/Enchanted_Book.gif', name: '介紹', clickable: true, row: 10, column: 5 }
    ],
    Rimon12_CN: [
        { id: "Rimon12_CN-donate", src: 'assets/images/item/diamond.png', name: '贊助', clickable: true, row: 10, column: 1 },
        { id: "Rimon12_CN", src: 'assets/images/player_icon/Rimon12_CN.png', name: 'Rimon12_CN', clickable: false, row: 10, column: 9 },
        { id: "Rimon12_CN-rank", src: 'assets/images/item/gold_ingot.png', name: '身分', clickable: true, row: 10, column: 8 },
        { id: "Rimon12_CN-introduce", src: 'assets/images/item/Enchanted_Book.gif', name: '介紹', clickable: true, row: 10, column: 5 }
    ]
  };
  
  // 打開寶箱並生成物品
  function openChest(playerName) {
    const grid = document.getElementById('chestGrid');
    grid.innerHTML = ''; // ✅ 清空原始內容

    const items = playerItems[playerName] || [];
    items.forEach(item => {
        const slot = createItemSlot(item);
        grid.appendChild(slot);
    });

    document.getElementById('chestGUI').classList.remove('hidden');

    if (!chestOpened) {
        sounds.openChest.play(); // **開箱音效（僅播放一次）**
        chestOpened = true;
    }
}
  
function updateChestContent(itemId) {
    const grid = document.getElementById('chestGrid');
    grid.innerHTML = ''; // ✅ 清空原本的內容

    const newItems = generateNewItems(itemId);
    newItems.forEach(item => {
        const slot = createItemSlot(item);
        grid.appendChild(slot);
    });

    sounds.itemClick.play(); // 播放物品點擊音效

    console.log(`更新 chestGUI 內容，顯示 ID=${itemId} 的新物品`);
}

  
// 更新寶箱內容或跳轉至新頁面
function createItemSlot(item) {
    const slot = document.createElement('div');
    slot.className = 'item-slot' + (item.clickable ? ' clickable' : '');
    slot.style.gridRowStart = item.row;
    slot.style.gridColumnStart = item.column;

    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.name;

    if (item.clickable) {
        slot.onclick = () => {
            sounds.itemClick.play(); // **播放物品點擊音效**
            if (item.redirect && item.openType) {
                if (item.openType === "redirect") {
                    window.location.href = item.redirect;
                } else if (item.openType === "newTab") {
                    window.open(item.redirect, '_blank');
                }
            } else {
                updateChestContent(item.id);
            }
        };
    }

    slot.setAttribute('data-name', item.name);
    slot.addEventListener('mouseenter', showTooltip);
    slot.addEventListener('mousemove', moveTooltip);
    slot.addEventListener('mouseleave', hideTooltip);

    slot.appendChild(img);
    return slot;
}

  // 根據玩家點擊的物品生成新物品----------------------------------------------------------------openType: "newTab" //openType: "redirect"
  function generateNewItems(itemId) {//-------------------------------------Potion_t-TW
    if (itemId === "Potion_TW-donate") {//斗內頁面
      return [
        { id: "back_to_Potion_TW", src: 'assets/images/item/left.png', name: '返回', clickable: true, row: 10, column: 1 },
        { id: "donate", src: 'assets/images/item/barrier.png', name: '贊助：無', clickable: false, row: 3, column: 5 }
      ];
    } else if (itemId === "Potion_TW-rank") {//身分
      return [
        { id: "back_to_Potion_TW", src: 'assets/images/item/left.png', name: '返回', clickable: true, row: 10, column: 8 },
        { id: "Potion_TW", src: 'assets/images/player_icon/Potion_TW.png', name: '藥水', clickable: false, row: 3, column: 5 },
        { id: "Potion-introduce", src: 'assets/images/item/paper.png', name: '我自己', clickable: false, row: 3, column: 6 }
      ];
    } else if (itemId === "back_to_Potion_TW") {//回到主頁 !!
      return [
        { id: "Potion_TW-donate", src: 'assets/images/item/diamond.png', name: '贊助', clickable: true, row: 10, column: 1 },
        { id: "Potion_TW", src: 'assets/images/player_icon/Potion_TW.png', name: '藥水 - 我自己', clickable: false, row: 10, column: 9 },
        { id: "Potion_TW-rank", src: 'assets/images/item/gold_ingot.png', name: '身分', clickable: true, row: 10, column: 8 },
        { id: "Potion_TW-introduce", src: 'assets/images/item/Enchanted_Book.gif', name: '介紹', clickable: true, row: 10, column: 5 }
      ];
    } else if (itemId === "Potion_TW-introduce") {//
        return [
            { id: "back_to_Potion_TW", src: 'assets/images/item/left.png', name: '返回', clickable: true, row: 5, column: 5 },
            { id: "change-page", src: 'assets/images/item/map.png', name: '跳轉->介紹頁面', clickable: true,redirect: 'introduce.html',openType: "newTab", row: 2, column: 2 },
            { id: "Potion_TW-introduce", src: 'assets/images/item/paper.png', name: 'hi~~', clickable: false, row: 3, column: 2 },
            { id: "Potion_TW-introduce", src: 'assets/images/item/paper.png', name: '我是藥水', clickable: false, row: 3, column: 3 },
            { id: "Potion_TW-introduce", src: 'assets/images/item/paper.png', name: '其實我也不知道要介紹什麼', clickable: false, row: 3, column: 4 },
            { id: "Potion_TW-introduce", src: 'assets/images/item/paper.png', name: '要看介紹 去看我的網頁8~', clickable: false, row: 3, column: 5 },
            { id: "Potion_TW-introduce", src: 'assets/images/item/Enchanted_Book.gif', name: '聯絡：', clickable: false, row: 4, column: 2 },
            { id: "Potion_TW-introduce", src: 'assets/images/icon/discord_logo.png', name: 'Discord', clickable: true,redirect: 'https://discord.com/invite/SCUuv5nDq7',openType: "newTab", row: 4, column: 3 },
            { id: "Potion_TW-introduce", src: 'assets/images/icon/YT_logo.png', name: 'Youtube', clickable: true,redirect: 'https://www.youtube.com/@potion_TW',openType: "newTab", row: 4, column: 4 },
        ]//-------------------------------------coc_TW
    } else if (itemId === "coc_TW-donate") {//斗內頁面
        return [
          { id: "back_to_coc_TW", src: 'assets/images/item/left.png', name: '返回', clickable: true, row: 10, column: 1 },
          { id: "donate", src: 'assets/images/item/emerald.png', name: '贊助：880$', clickable: false, row: 3, column: 5 }
        ];
      } else if (itemId === "coc_TW-rank") {//身分
        return [
          { id: "back_to_coc_TW", src: 'assets/images/item/left.png', name: '返回', clickable: true, row: 10, column: 8 },
          { id: "coc_TW", src: 'assets/images/player_icon/coc_TW.png', name: 'coc_TW', clickable: false, row: 3, column: 5 },
          { id: "coc_TW-introduce", src: 'assets/images/item/paper.png', name: '朋友', clickable: false, row: 3, column: 6 },
          { id: "coc_TW-introduce", src: 'assets/images/item/paper.png', name: '合作夥伴', clickable: false, row: 3, column: 4 },
          { id: "coc_TW-introduce", src: 'assets/images/item/paper.png', name: '同學', clickable: false, row: 3, column: 7 },
        ];
      } else if (itemId === "back_to_coc_TW") {//回到主頁 !!
        return [
          { id: "coc_TW-donate", src: 'assets/images/item/diamond.png', name: '贊助', clickable: true, row: 10, column: 1 },
          { id: "coc_TW", src: 'assets/images/player_icon/coc_TW.png', name: 'coc_TW', clickable: false, row: 10, column: 9 },
          { id: "coc_TW-rank", src: 'assets/images/item/gold_ingot.png', name: '身分', clickable: true, row: 10, column: 8 },
          { id: "coc_TW-introduce", src: 'assets/images/item/Enchanted_Book.gif', name: '介紹', clickable: true, row: 10, column: 5 }
        ];
      } else if (itemId === "coc_TW-introduce") {
          return [
              { id: "back_to_coc_TW", src: 'assets/images/item/left.png', name: '返回', clickable: true, row: 5, column: 5 },
              { id: "change-page", src: 'assets/images/item/barrier.png', name: '無頁面', clickable: false, row: 2, column: 2 },
              { id: "coc_TW-introduce", src: 'assets/images/item/paper.png', name: 'hello~', clickable: false, row: 3, column: 2 },
              { id: "coc_TW-introduce", src: 'assets/images/item/paper.png', name: '我是coc_TW', clickable: false, row: 3, column: 3 },
              { id: "coc_TW-introduce", src: 'assets/images/item/paper.png', name: '訂閱我 (⁎⁍̴̛ᴗ⁍̴̛⁎)', clickable: false, row: 3, column: 4 },
              { id: "coc_TW-introduce", src: 'assets/images/item/Enchanted_Book.gif', name: '聯絡：', clickable: false, row: 4, column: 2 },
              { id: "coc_TW-introduce", src: 'assets/images/item/barrier.png', name: 'Discord：無', clickable: false, row: 4, column: 3 },
              { id: "coc_TW-introduce", src: 'assets/images/icon/YT_logo.png', name: 'Youtube', clickable: true,redirect: 'https://www.youtube.com/@coc_TW',openType: "newTab", row: 4, column: 4 },
          ]//-------------------------------------Rimon12_CN
      } else if (itemId === "Rimon12_CN-donate") {//斗內頁面
        return [
          { id: "back_to_Rimon12_CN", src: 'assets/images/item/left.png', name: '返回', clickable: true, row: 10, column: 1 },
          { id: "donate", src: 'assets/images/item/barrier.png', name: '贊助：無', clickable: false, row: 3, column: 5 }
        ];
      } else if (itemId === "Rimon12_CN-rank") {//身分
        return [
          { id: "back_to_Rimon12_CN", src: 'assets/images/item/left.png', name: '返回', clickable: true, row: 10, column: 8 },
          { id: "Rimon12_CN", src: 'assets/images/player_icon/Rimon12_CN.png', name: 'Rimon12_CN', clickable: false, row: 3, column: 5 },
          { id: "Rimon12_CN-introduce", src: 'assets/images/item/paper.png', name: '合作夥伴', clickable: false, row: 3, column: 6 },
        ];
      } else if (itemId === "back_to_Rimon12_CN") {//回到主頁 !!
        return [
          { id: "Rimon12_CN-donate", src: 'assets/images/item/diamond.png', name: '贊助', clickable: true, row: 10, column: 1 },
          { id: "Rimon12_CN", src: 'assets/images/player_icon/Rimon12_CN.png', name: 'Rimon12_CN', clickable: false, row: 10, column: 9 },
          { id: "Rimon12_CN-rank", src: 'assets/images/item/gold_ingot.png', name: '身分', clickable: true, row: 10, column: 8 },
          { id: "Rimon12_CN-introduce", src: 'assets/images/item/Enchanted_Book.gif', name: '介紹', clickable: true, row: 10, column: 5 }
        ];
      } else if (itemId === "Rimon12_CN-introduce") {//
          return [
              { id: "back_to_Rimon12_CN", src: 'assets/images/item/left.png', name: '返回', clickable: true, row: 5, column: 5 },
              { id: "change-page", src: 'assets/images/item/barrier.png', name: '無頁面', clickable: false, row: 2, column: 2 },
              { id: "Rimon12_CN-introduce", src: 'assets/images/item/barrier.png', name: '無介紹', clickable: false, row: 3, column: 2 },
              { id: "coc_TW-introduce", src: 'assets/images/item/Enchanted_Book.gif', name: '聯絡：', clickable: false, row: 4, column: 2 },
              { id: "Rimon12_CN-introduce", src: 'assets/images/icon/discord_logo.png', name: 'Discord', clickable: true,redirect: 'https://discord.gg/kP2JPJB5p2',openType: "newTab", row: 4, column: 3 },
              { id: "Rimon12_CN-introduce", src: 'assets/images/item/barrier.png', name: 'Youtube：無', clickable: false, row: 4, column: 4 },
          ]//-------------------------------------
      }
    return []; // 沒有定義則回傳空陣列
  }
  
  function playItemClickSound(itemId) {
    if (sounds.itemClick[itemId]) {
        sounds.itemClick[itemId].play();
    }
}

  // 顯示工具提示
  function showTooltip(event) {
    const tooltip = document.getElementById('tooltip');
    const itemSlot = event.currentTarget;
    const itemName = itemSlot.getAttribute('data-name');

    if (itemName) {
        tooltip.innerText = itemName;
        tooltip.style.display = 'block';
    }
}

function moveTooltip(event) {
    const tooltip = document.getElementById('tooltip');
    tooltip.style.left = `${event.pageX + 10}px`;
    tooltip.style.top = `${event.pageY + 10}px`;
}

function hideTooltip() {
    document.getElementById('tooltip').style.display = 'none';
}


  // 關閉寶箱
  function closeChest(e) {
    if (e.target.id === 'chestGUI') {
        document.getElementById('chestGUI').classList.add('hidden');
        sounds.closeChest.play(); // 播放關閉箱子音效
        chestOpened = false; // **重置開箱狀態**
    }
}


  
