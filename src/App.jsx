import { useState } from "react";
import { Web3Modal, useWeb3Modal } from "@web3modal/react";
import { EthereumClient, w3mConnectors, w3mProvider } from "@web3modal/ethereum";
import {
  configureChains,
  createConfig,
  WagmiConfig,
  useAccount
} from "wagmi";
import { bsc } from "wagmi/chains";
import { motion } from "framer-motion";
import { Link, animateScroll as scroll } from "react-scroll";

import "./App.css";

// ✅ Chain config (only BSC for Phase 1)
const chains = [bsc];
const projectId = "4e752161826eec74f75e8623b2401a7c";
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

const AppInner = () => {
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();

  return (
    <div className="relative w-screen min-h-screen text-white overflow-x-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Floating Nav Bar */}
      <nav className="fixed top-4 left-4 z-20 flex gap-3 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full shadow">
        <Link
          to="tokenomics"
          smooth={true}
          duration={500}
          className="cursor-pointer text-sm hover:text-purple-300"
        >
          Tokenomics
        </Link>
        <Link
          to="roadmap"
          smooth={true}
          duration={500}
          className="cursor-pointer text-sm hover:text-purple-300"
        >
          Roadmap
        </Link>
        <Link
          to="team"
          smooth={true}
          duration={500}
          className="cursor-pointer text-sm hover:text-purple-300"
        >
          Team
        </Link>
      </nav>

      {/* Intro Section */}
      <section className="relative z-10 h-screen flex flex-col items-center justify-center gap-6 text-center px-4 bg-black/40">
        <h1 className="text-5xl font-bold text-[#E6E6FA] drop-shadow-lg">
          CICADA DAPP
        </h1>
        <p className="text-lg text-white max-w-xl drop-shadow-sm">
          A next-gen secure, transparent, and community-powered ecosystem.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          className="bg-[#9370DB] text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-purple-600"
          onClick={open}
        >
          {isConnected && address
            ? `Connected: ${address.substring(0, 6)}...${address.slice(-4)}`
            : "Connect Wallet"}
        </motion.button>

        <Link
          to="tokenomics"
          smooth={true}
          duration={800}
          className="mt-8 cursor-pointer text-white hover:text-purple-300 underline"
        >
          Explore more ↓
        </Link>
      </section>

      {/* Scrollable Sections with Blur Glass Effect */}
      <section
        id="details"
        className="relative z-10 py-20 px-6 md:px-20 space-y-32"
      >
        {/* Tokenomics */}
        <motion.div
          id="tokenomics"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="backdrop-blur-lg bg-white/10 p-8 rounded-2xl shadow-lg text-center"
        >
          <h2 className="text-4xl font-bold text-[#E6E6FA] mb-4">Tokenomics</h2>
          <p className="text-lg text-white max-w-3xl mx-auto">
            Fixed supply, transparent allocation. 10% treasury, 5% team, 5% locked reserve, 80% public.
          </p>
        </motion.div>

        {/* Roadmap */}
        <motion.div
          id="roadmap"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="backdrop-blur-lg bg-white/10 p-8 rounded-2xl shadow-lg text-center"
        >
          <h2 className="text-4xl font-bold text-[#E6E6FA] mb-4">Roadmap</h2>
          <p className="text-lg text-white max-w-3xl mx-auto">
            Phase 1: Launch & manual sale <br />
            Phase 2: Liquidity & locking <br />
            Phase 3: Multi-chain expansion & utility integrations
          </p>
        </motion.div>

        {/* Team */}
        <motion.div
          id="team"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="backdrop-blur-lg bg-white/10 p-8 rounded-2xl shadow-lg text-center"
        >
          <h2 className="text-4xl font-bold text-[#E6E6FA] mb-4">Our Team</h2>
          <p className="text-lg text-white max-w-3xl mx-auto">
            Built by visionary developers, designers & crypto educators with transparency and purpose.
          </p>
        </motion.div>
      </section>

      {/* Back to Top */}
      <button
        onClick={() => scroll.scrollToTop()}
        className="fixed bottom-6 right-6 bg-[#9370DB] hover:bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg z-30"
      >
        ↑ Top
      </button>
    </div>
  );
};

const App = () => (
  <WagmiConfig config={wagmiConfig}>
    <AppInner />
    <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
  </WagmiConfig>
);

export default App;
