import { type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.2 }}
          >
            {/* backdrop blur */}
            <motion.div
              className="absolute inset-0 bg-black/10 backdrop-blur-md"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              onClick={onClose}
            />
            {/* modal */}
            <motion.div 
              className="bg-white p-6 rounded-xl w-full max-w-md relative z-10"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <button
                onClick={onClose}
                className="absolute top-2 right-2 p-3 text-gray-500 hover:text-gray-800"
              >
            ✕
          </button>
          {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;


// import { type ReactNode } from "react";
// import { motion, AnimatePresence, animate } from "framer-motion";


// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   children: ReactNode;
// }

// const backdropVariants = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1 },
//   exit: { opacity: 0 },
// };

// const modalVariants = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1 },
//   exit: { opactiy: 0 },
// };

// const Modal = ({ isOpen, onClose, children }: ModalProps) => {
//   if (!isOpen) return null;
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           className="fixed inset-0 flex items-center justify-center z-50"
//           variants={backdropVariants}
//           initial="hidden"
//           animate="visible"
//           exit="exit"
//           transition={{ duration: 0.2 }}
//           >
//             {/* backdrop blur */}
//             <motion.div
//               className="absolute inset-0 bg-black/10 backdrop-blur-md"
//               variants={backdropVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               transition={{ duration: 0.6, ease: "easeInOut" }}
//               onClick={onClose}
//             />
//             {/* modal */}
//             <motion.div 
//               className="bg-white p-6 rounded-xl w-full max-w-md relative z-10"
//               variants={modalVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               transition={{ duration: 0.3, ease: "easeOut" }}
//             >
//               <button
//                 onClick={onClose}
//                 className="absolute top-2 right-2 p-3 text-gray-500 hover:text-gray-800"
//               >
//             ✕
//           </button>
//           {children}
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default Modal;
