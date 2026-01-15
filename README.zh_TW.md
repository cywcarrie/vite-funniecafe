# Funnie Cafe - Cafe 購物電商網站 (全英文)

## 專案簡介 - 其他版本語言 : [English](README.md)

### 網頁 : [Link]

模擬全英文電商網站，使用者可以將商品加入購物車、移除商品和送出訂單，以及可以輸入關鍵字搜尋商品，並且可以瀏覽個別商品的詳細資訊；同時支援淺色與深色主題切換，提供更佳的使用者體驗與視覺舒適度。後台則提供新增或修改商品和優惠券的功能。

## 專案使用技術

- 使用 Vue.js 框架搭配 Vite 和 Pinia 建立專案
- 使用 Vue Router 和 axios，以實現路由管理和串接 API 資料
- 運用 Composition API 重構代碼邏輯，提升可維護性與可讀性
- 配置 ESLint 符合 Standard 規範，確保程式碼品質
- 透過 Pinia 進行狀態管理，負責跨元件的數據操作與共享
- 透過 Tailwind CSS 建構靈活且響應式的介面設計，有效提升整體使用者體驗

## 網站功能

- 前台 (全英文頁面)
  - 首頁
  - 商品列表：商品分類、用關鍵字搜尋商品
  - 商品詳情
  - 購物車：新增或移除商品、套用優惠劵
  - 結帳：建立及送出訂單
  - 主題切換：支援淺色與深色主題切換
- 後台 (管理者)
  - 商品管理：切換上、下架商品，新增、修改、刪除商品及上傳商品圖片
  - 訂單管理：查看客戶訂單，也可以刪除已查看訂單
  - 優惠券管理：新增、修改、刪除優惠劵

## 安裝套件

```sh
npm install
```

### 運行專案

```sh
npm run dev
```

### 打包專案

```sh
npm run build
```

### 部署專案

```sh
npm run deploy
```

## 專案套件

- vue - v3.5.26
- vite - v5.3.1
- pinia - v3.0.4
- vue-router - v4.6.4
- axios - v1.13.2
- vue-loading-overlay - v6.0.6
- sweetalert2 - v11.26.17
- swiper - v12.0.3
- vee-validate - v4.15.1
- tailwind css - v4.1.18
- heroicons - v2.2.0
