import { motion, AnimatePresence } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";
import { useThemeStore } from "../store/themeStore";

export const BotaoTema = () => {
  const { theme, toggleTheme, hasHydrated } = useThemeStore();

  if (!hasHydrated) return null; // Evita renderizar antes da hidratação

  // Resto do componente igual
  return (
    <div>
      <motion.button
        onClick={toggleTheme}
        className="fixed top-4 right-4 w-14 h-8 rounded-full shadow-lg z-50 cursor-pointer"
        animate={{
          backgroundColor: theme === "light" ? "#ffffff" : "#1f2937",
        }}
        transition={{ duration: 0.4 }}
        aria-label="Toggle Theme"
      >
        <motion.div
          className="absolute top-1 left-1 w-6 h-6 rounded-full bg-white"
          layout
          initial={false}
          animate={{
            x: theme === "dark" ? 24 : 0,
            backgroundColor: theme === "light" ? "#fbbf24" : "#3b82f6",
          }}
          transition={{ type: "spring", stiffness: 700, damping: 30 }}
        />

        <div className="relative w-full h-full flex items-center justify-between px-1 pointer-events-none">
          <AnimatePresence mode="wait">
            {theme === "light" ? (
              <motion.div
                key="sun"
                className="flex justify-start w-full p-1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
              >
                <FaSun className="w-4 h-4 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                className="flex justify-end w-full p-1"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <FaMoon className="w-4 h-4 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.button>
    </div>
  );
};
