# Tail Talks - Web3 Frontend

A modern Web3 frontend application built with Next.js 14, Tailwind CSS, shadcn/ui components, and wagmi for Web3 integration.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14, TypeScript, Tailwind CSS
- **Beautiful UI**: shadcn/ui components with dark mode support
- **Web3 Integration**: wagmi, viem, and WalletConnect for seamless wallet connections
- **Multi-Chain Support**: Ethereum Mainnet and Sepolia testnet
- **Responsive Design**: Mobile-first design with beautiful animations
- **Performance Optimized**: Built with Next.js 14 App Router

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Web3 Libraries**: wagmi, viem
- **Wallet Integration**: WalletConnect
- **State Management**: TanStack Query (React Query)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd tail-talks-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Web3 Configuration
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id_here
   
   # Optional: Custom RPC URLs
   # NEXT_PUBLIC_MAINNET_RPC_URL=https://mainnet.infura.io/v3/your_infura_key
   # NEXT_PUBLIC_SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/your_infura_key
   ```

4. **Get a WalletConnect Project ID**
   - Visit [WalletConnect Cloud](https://cloud.walletconnect.com/)
   - Create a new project
   - Copy the Project ID to your `.env.local` file

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔗 Wallet Integration

The app supports the following wallet connections:

- **MetaMask**: Browser extension and mobile app
- **WalletConnect**: Connect with 300+ wallets
- **Injected Wallets**: Any wallet that injects into the browser

### Supported Networks

- **Ethereum Mainnet** (Chain ID: 1)
- **Sepolia Testnet** (Chain ID: 11155111)

## 🎨 Customization

### Adding New Components

Use shadcn/ui to add new components:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
```

### Modifying Styles

The app uses Tailwind CSS with CSS variables for theming. You can customize:

- **Colors**: Edit `src/app/globals.css`
- **Fonts**: Modify `src/app/layout.tsx`
- **Components**: Update files in `src/components/ui/`

### Web3 Configuration

Modify Web3 settings in `src/lib/web3.ts`:

```typescript
export const config = createConfig({
  chains: [mainnet, sepolia], // Add more chains here
  connectors: [
    injected(),
    walletConnect({ projectId }),
    // Add more connectors
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed on any platform that supports Next.js:

- **Netlify**: Use `npm run build && npm run export`
- **AWS Amplify**: Connect your GitHub repository
- **Railway**: Deploy directly from GitHub

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | WalletConnect Cloud project ID | Yes |
| `NEXT_PUBLIC_MAINNET_RPC_URL` | Custom Ethereum mainnet RPC URL | No |
| `NEXT_PUBLIC_SEPOLIA_RPC_URL` | Custom Sepolia testnet RPC URL | No |

## 📚 Project Structure

```
src/
├── app/                  # Next.js 14 App Router
│   ├── globals.css      # Global styles with CSS variables
│   ├── layout.tsx       # Root layout with providers
│   └── page.tsx         # Home page component
├── components/          # React components
│   ├── providers/       # Context providers
│   ├── ui/             # shadcn/ui components
│   └── wallet-connect.tsx # Wallet connection component
└── lib/                # Utility functions
    ├── utils.ts        # Class name utilities
    └── web3.ts         # Web3 configuration
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Report bugs or request features via GitHub Issues
- **Community**: Join our community discussions

## 🔗 Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [wagmi Documentation](https://wagmi.sh)
- [WalletConnect](https://walletconnect.com)

---

Built with ❤️ using Next.js, Tailwind CSS, and shadcn/ui
