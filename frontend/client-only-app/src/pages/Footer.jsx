import { motion } from "framer-motion";

const Footer = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const marquee = {
    animate: {
      x: ["100%", "-100%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        },
      },
    },
  };

  return (
    <motion.footer
      className="pt-5 pb-4 mt-5 text-white"
      style={{
        background: "linear-gradient(135deg, #f97316, #ea730c)",
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="container text-center"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.p variants={item} className="mb-4 fw-medium">
          &copy; 2025 Your Company. All rights reserved.
        </motion.p>

        <motion.nav
          className="d-flex justify-content-center flex-wrap gap-4 mb-4"
          variants={item}
        >
          {[
            { href: "/privacy", text: "Privacy Policy" },
            { href: "/terms", text: "Terms of Service" },
            { href: "/contactus", text: "Contact Us" },
          ].map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              className="text-white text-decoration-none fw-semibold px-2"
              whileHover={{
                y: -2,
                scale: 1.05,
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {link.text}
            </motion.a>
          ))}
        </motion.nav>

        <motion.div
          className="d-flex justify-content-center gap-3 mb-4"
          variants={item}
        >
          {[
            {
              href: "https://www.facebook.com/",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              ),
            },
            {
              href: "https://www.x.com/",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>
              ),
            },
            {
              href: "https://www.instagram.com/",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <circle cx="17.5" cy="6.5" r="0.5" />
                </svg>
              ),
            },
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              className="bg-light text-dark p-2 rounded-circle d-flex align-items-center justify-content-center"
              whileHover={{
                y: -5,
                scale: 1.1,
                rotate: [0, 10, -10, 0],
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          className="bg-black bg-opacity-25 py-2 overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="text-white text-center fw-medium"
            variants={marquee}
            animate="animate"
          >
            DonateFlow: Empowering every girl, one donation at a time.
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
