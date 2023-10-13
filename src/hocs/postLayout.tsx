import Footer from "@/components/footer";
import Header from "@/components/header";
import React from "react";

interface PostLayoutProps {
  children: React.ReactNode;
}

export default function PostLayout({ children }: PostLayoutProps) {
  return (
    <div>
      <Header />
      <div style={styles.container}>{children}</div>
      <Footer />
    </div>
  );
}

interface Styles {
  container: React.CSSProperties;
}

const styles: Styles = {
  container: {
    maxWidth: "800px",
    margin: "120px auto",
    padding: "20px",
    boxSizing: "border-box" as "border-box", // Include padding in the width calculation
  },
};

// Media query for smaller screens (adjust as needed)
const smallScreens = "@media (max-width: 600px)";

// Responsive styles
(styles.container as any)[smallScreens] = {
  maxWidth: "100%", // Adjust for smaller screens
  margin: "60px auto", // Adjust margin for smaller screens
};
