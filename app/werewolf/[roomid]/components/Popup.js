import { useState } from "react";
const Popup = ({ isOpen, onClose, changeLanguage }) => {
  if (!isOpen) return null;
  return (
    <>
      {changeLanguage ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-4 rounded shadow-lg">
            <div className="text-center text-3xl ">角色技能</div>
            <ul className="space-y-6 text-left text-gray-700 leading-relaxed">
              <li className="mt-4">
                <strong className="font-semibold text-gray-900">警察技能（膊頭有花）</strong>: "對唔住，我係差人。"
                可以每晚選擇射殺一個人，如果錯殺無菇市民，就會失去手槍，變成冇任何能力既廢柴。
              </li>
              <li className="mt-4">
                <strong className="font-semibold text-gray-900">偵探技能（花生專家）</strong>:
                “等我八卦完再update你，頭號花生友一定係我～ 每晚可以八卦一名玩家既陣營係好人定係衰人。
              </li>
              <li className="mt-4">
                <strong className="font-semibold text-gray-900">金槍人技能（鐵布衫）</strong>:
                “就憑你果招垃圾技就想殺我想保護既人？”
                每晚可以保護一名玩家唔會比古惑仔坑害，但無辦法擋住唔係人（彊屍）既攻擊。
              </li>
              <li className="mt-4">
                <strong className="font-semibold text-gray-900">龍婆技能（通靈）</strong>:
                “龍婆既口號：‘死者之言，聲聲入耳。' 每晚都可以查看已歸西既玩家之間既對話。
              </li>
              <li className="mt-4">
                <strong className="font-semibold text-gray-900">如花技能（如花似玉）</strong>:
                “我係黃花閨女黎嫁嘛，唔好曬時間，快啲黎啦！”
                能夠將一人與其連結。如果其中一個人死左，另一人都會跟住攬炒，唔理係邊個陣營。
              </li>
              <li className="mt-4">
                <strong className="font-semibold text-gray-900">哨兵技能（放大鏡）</strong>: “哇!好骨緻喎!!!’”
                每晚可以查看一名玩家。如果有其他人當晚拜訪了該玩家，他們的名字將會顯示給哨兵。
              </li>
              <li className="mt-4">
                <strong className="font-semibold text-gray-900">獄卒技能（畫地為牢）</strong>:
                “想搞搞震？畫個圈圈詛咒你，拖你入黑房面壁思過！”
                選擇一名玩家將其關入黑房，阻止果個玩家當晚使用技能。被人困住既玩家係黑房面壁思過期間唔會被殺。
              </li>
              <li className="mt-4">
                <strong className="font-semibold text-gray-900">茅山道士技能（掌心雷法）</strong>:
                “但凡係遺禍人間，塗毒生靈既妖孽，都由我黎解決”
                每晚選擇一名玩家。如果目標係彊屍，可以將佢殺死。如果被彊屍攻擊，會反殺番吸血鬼。假如場上無囇彊屍，道士會轉職做警察。
              </li>
              <li className="mt-4">
                <strong className="font-semibold text-gray-900">金牌打手技能（收保護費）</strong>:
                “金牌打手：‘12點之後，呢到我話事”
                每晚可以殺死一名玩家。如果金牌打手死亡，將會隨機選擇一名古惑仔升級做金牌打手。
              </li>
              <li className="mt-4">
                <strong className="font-semibold text-gray-900">二五仔技能（專業卧底）</strong>: “我係‘好人’，邊個知呀”
                當比偵探查看身分果陣，會顯示為好人，但係實際立場係屬於古惑仔陣營。
              </li>
              <li className="mt-4">
                <strong className="font-semibold text-gray-900">欺詐師技能（完美偽裝）</strong>:
                “唔好意思，不過我係特登既” 每晚可以選擇“陷害”一位玩家。當偵探查看果個玩家果陣，會顯示做“衰人”。
              </li>
              <li className="mt-4">
                <strong className="font-semibold text-gray-900">賭徒技能（賭命）</strong>: “唔係你死就係我死”
                每晚可以賭一個人既真實身份，賭中對方出局；賭唔中就會自爆身份比所有人知。
              </li>
              <li className="mt-4">
                <strong className="font-semibold text-gray-900">彊屍技能（Q親你對唔住）</strong>:
                “CHU！我咁可愛你地唔係想殺左我下話？” 可以將其他玩家轉化為彊屍。如果彊屍攻擊古惑仔，古惑仔會死亡。
              </li>
              <li className="mt-4">
                <strong className="font-semibold text-gray-900">謀略家技能（金手指）</strong>:
                “呢個世界就係比有權力既人話事架啦” 諗盡計仔將某個特定目標比人票死。
              </li>
              <li className="mt-4">
                <strong className="font-semibold text-gray-900">小丑技能（娛樂至死）</strong>:
                “我既存在本身就係一個笑話，票死我，我就帶一個人同我攬炒，咁中意食花生呀拿！”
                試圖叫人票死自己黎“取悅”大眾花生友。被人票殺之後，可以選擇殺死一個投票比佢既人。
              </li>
              <li className="mt-4">
                <strong className="font-semibold text-gray-900">白痴技能（回憶）</strong>:
                “我個頭好痛呀，我個頭好痛呀，我個頭好痛呀.....”
                係遊戲入面只可以選擇一名已歸西既玩家，繼承佢既角色、陣營同任務。取代左既新身份將會聊天室到公開。
              </li>
            </ul>
            <button
              onClick={onClose}
              className="mt-6 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition duration-200"
            >
              關閉
            </button>
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-4 rounded shadow-lg">
            <div className="text-center text-3xl ">角色技能</div>
            <ul className="space-y-6 text-left text-gray-700 leading-relaxed">
              <li className="mt-4">
                <strong className="font-semibold text-gray-900">警察技能（膊頭有花）</strong>: "對唔住，我係差人。"
                可以每晚選擇射殺一個人，如果錯殺無菇市民，就會失去手槍，變成冇任何能力既廢柴。
              </li>
              <li className="mt-4">
                <strong className="font-semibold text-gray-900">偵探技能（花生專家）</strong>:
                “等我八卦完再update你，頭號花生友一定係我～ 每晚可以八卦一名玩家既陣營係好人定係衰人。
              </li>
              <li className="mt-4">
                <strong className="font-semibold text-gray-900">金槍人技能（鐵布衫）</strong>:
                “就憑你果招垃圾技就想殺我想保護既人？”
                每晚可以保護一名玩家唔會比古惑仔坑害，但無辦法擋住唔係人（吸血鬼）既攻擊。
              </li>
              <li className="mt-4">
                <strong className="font-semibold text-gray-900">龍婆技能（通靈）</strong>:
                “龍婆既口號：‘死者之言，聲聲入耳。' 每晚都可以查看已歸西既玩家之間既對話。
              </li>
              <li className="mt-4">
                <strong className="font-semibold text-gray-900">如花技能（如花似玉）</strong>:
                “我係黃花閨女黎嫁嘛，唔好曬時間，快啲黎啦！”
                能夠將一人與其連結。如果其中一個人死左，另一人都會跟住攬炒，唔理係邊個陣營。
              </li>
              <li className="mt-4">
                <strong className="font-semibold text-gray-900">哨兵技能（放大鏡）</strong>: “哇!好骨緻喎!!!’”
                每晚可以查看一名玩家。如果有其他人當晚拜訪了該玩家，他們的名字將會顯示給哨兵。
              </li>
              <li className="mt-4">
                <strong className="font-semibold text-gray-900">獄卒技能（畫地為牢）</strong>:
                “想搞搞震？畫個圈圈詛咒你，拖你入黑房面壁思過！”
                選擇一名玩家將其關入黑房，阻止果個玩家當晚使用技能。被人困住既玩家係黑房面壁思過期間唔會被殺。
              </li>
              <li className="mt-4">
                <strong className="font-semibold text-gray-900">茅山道士技能（掌心雷法）</strong>:
                “但凡係遺禍人間，塗毒生靈既妖孽，都由我黎解決”
                每晚選擇一名玩家。如果目標係彊屍，可以將佢殺死。如果被彊屍攻擊，會反殺番吸血鬼。假如場上無囇彊屍，道士會轉職做警察。
              </li>
              <li className="mt-4">
                <strong className="font-semibold text-gray-900">金牌打手技能（收保護費）</strong>:
                “金牌打手：‘12點之後，呢到我話事”
                每晚可以殺死一名玩家。如果金牌打手死亡，將會隨機選擇一名古惑仔升級做金牌打手。
              </li>
              <li className="mt-4">
                <strong className="font-semibold text-gray-900">二五仔技能（專業卧底）</strong>: “我係‘好人’，邊個知呀”
                當比偵探查看身分果陣，會顯示為好人，但係實際立場係屬於古惑仔陣營。
              </li>
              <li className="mt-4">
                <strong className="font-semibold text-gray-900">欺詐師技能（完美偽裝）</strong>:
                “唔好意思，不過我係特登既” 每晚可以選擇“陷害”一位玩家。當偵探查看果個玩家果陣，會顯示做“衰人”。
              </li>
              <li className="mt-4">
                <strong className="font-semibold text-gray-900">賭徒技能（賭命）</strong>: “唔係你死就係我死”
                每晚可以賭一個人既真實身份，賭中對方出局；賭唔中就會自爆身份比所有人知。
              </li>
              <li className="mt-4">
                <strong className="font-semibold text-gray-900">彊屍技能（Q親你對唔住）</strong>:
                “CHU！我咁可愛你地唔係想殺左我下話？” 可以將其他玩家轉化為彊屍。如果彊屍攻擊古惑仔，古惑仔會死亡。
              </li>
              <li className="mt-4">
                <strong className="font-semibold text-gray-900">謀略家技能（金手指）</strong>:
                “呢個世界就係比有權力既人話事架啦” 諗盡計仔將某個特定目標比人票死。
              </li>
              <li className="mt-4">
                <strong className="font-semibold text-gray-900">小丑技能（娛樂至死）</strong>:
                “我既存在本身就係一個笑話，票死我，我就帶一個人同我攬炒，咁中意食花生呀拿！”
                試圖叫人票死自己黎“取悅”大眾花生友。被人票殺之後，可以選擇殺死一個投票比佢既人。
              </li>
              <li className="mt-4">
                <strong className="font-semibold text-gray-900">白痴技能（回憶）</strong>:
                “我個頭好痛呀，我個頭好痛呀，我個頭好痛呀.....”
                係遊戲入面只可以選擇一名已歸西既玩家，繼承佢既角色、陣營同任務。取代左既新身份將會聊天室到公開。
              </li>
            </ul>
            <button
              onClick={onClose}
              className="mt-6 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition duration-200"
            >
              關閉
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
