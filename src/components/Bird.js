import Image from "next/image";
import { motion } from "framer-motion";

export default function Bird({ yPos }) {
  return (
    <motion.div
      style={{
        position: "absolute",
        left: 50,
        top: yPos,
      }}
      initial={{ y: 0 }}
      animate={{ y: yPos }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      <Image src="/images/bird-midflap.png" width={51} height={36} alt="bird" />
    </motion.div>
  );
}
