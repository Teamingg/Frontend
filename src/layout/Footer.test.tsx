import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer 컴포넌트", () => {
  it("footer 컴포넌트의 텍스트를 올바르게 렌더링해야 합니다.", () => {
    render(<Footer />);
    
    // "© 2024 Teaming. All rights reserved." 문구가 있는지 확인
    expect(screen.getByText(/© 2024 Teaming. All rights reserved./i)).toBeInTheDocument();
  });
});