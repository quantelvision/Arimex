"use client";

import { Component, type ReactNode } from "react";

type BoundaryProps = { children: ReactNode; fallback: ReactNode };

// an action that throws (network loss, a deploy mid session) would otherwise replace the whole page
export default class EnquiryFormBoundary extends Component<BoundaryProps, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error("Enquiry form failed:", error);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
