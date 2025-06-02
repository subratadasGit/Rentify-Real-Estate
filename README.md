# 🏠 Rentify

Rentify is a hybrid Web2-Web3 real estate platform that allows users to buy and sell properties through a familiar Web2 interface, while leveraging the power and transparency of blockchain to finalize transactions via smart contracts. It brings trust, security, and decentralization to real estate.

---

## 🚀 Features

- 🌐 **Hybrid Web2 + Web3** architecture
- 🔐 **User authentication** using Clerk
- 🏘️ **List, edit, and delete** properties with image uploads (via Supabase)
- 📦 **Secure payments** via Razorpay
- 🧾 **Invoice generation** with real-time status tracking
- 🪙 **NFT Minting** for property ownership certificates
- ⚖️ **Smart contract integration** for trustless transactions
- 📄 **Detailed property information** with live previews

---

## 🛠 Tech Stack

| Layer          | Technology                                                                 |
|----------------|-----------------------------------------------------------------------------|
| **Frontend**   | Next.js, React, Tailwind CSS, Formik                                        |
| **Backend**    | Node.js (API routes), Supabase (DB & storage), Clerk (Auth)                 |
| **Blockchain** | Solidity, Foundry, Ethers.js, **Sepolia Testnet**                           |
| **Payments**   | Razorpay API, Invoice PDF generation                                        |
| **Web3 Storage**| IPFS via Pinata                                                             |

---

## 📸 Screenshots

> Add screenshots here (list page, edit form, NFT mint screen, etc.)

---

## 🧪 Local Development

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/rentify.git](https://github.com/subratadasGit/Rentify-Real-Estate
cd Rentify-Real-Estate
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file and add:

```env
# 🌐 Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-url.supabase.co
NEXT_PUBLIC_SUPABASE_API_KEY=your-supabase-anon-key
NEXT_PUBLIC_IMAAGE_PUBLIC_URL=https://your-supabase-url.supabase.co/storage/v1/object/public/listingimages/

# 🔐 Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
CLERK_SECRET_KEY=your-clerk-secret-key
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/

# 📍 Google Places API
NEXT_PUBLIC_GOOGLE_PLACE_API_KEY=your-google-places-api-key
GOOGLE_API_KEY=your-google-api-key

# 💳 Razorpay Payment Gateway
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_SECRET=your-razorpay-secret

# 🔗 Blockchain (Sepolia)
NEXT_PUBLIC_SEPOLIA_RPC=https://sepolia.infura.io/v3/your-infura-project-id

# 📦 IPFS via Pinata
PINATA_API_KEY=your-pinata-api-key
PINATA_SECRET_API_KEY=your-pinata-secret-api-key

### 4. Run the app

```bash
npm run dev
```

---

## ⚙️ Deployment

You can deploy Rentify easily on platforms like:

- [Vercel](https://vercel.com/)
- [Netlify](https://netlify.com/)

Don’t forget to configure your environment variables on the dashboard.

---

## 🔐 Smart Contracts

The Solidity contract `PropertyOwnership.sol` manages:

- Minting of NFTs for property ownership
- Verifying ownership and transfers
- Linking property metadata with IPFS

Use Foundry or Hardhat for local testing and deployment. Deployed on **Sepolia Testnet**.

---

## ✨ Coming Soon

- AI-powered property recommendations
- Full transaction history & analytics
- On-chain dispute resolution
- Dynamic pricing models

---

## 🤝 Contributing

We welcome contributions! To get started:

```bash
git checkout -b feature/your-feature
```

Submit a pull request once ready 🚀

---

## 👥 Contributors

- **Subrata Das** – [subratadasgit786@gmail.com](mailto:subratadasgit786@gmail.com)
- **Suvra Bhattacharjee**
- **Udar Das**

---

## 📄 License

MIT License © 2025 Subrata Das

---

## 📬 Contact

For questions, reach out at:

- **Email**: subratadasgit786@gmail.com
- **LinkedIn**: [linkedin.com/in/subratadas786](https://linkedin.com/in/subrata-das-mca)

---

> Built with 💙 by Subrata Das and contributors.
