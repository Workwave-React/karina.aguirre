import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LimitSelector from "../../src/components/pagination/LimitSelector";

describe("LimitSelector", () => {
  it("renders with the current limit", () => {
    const mockChange = vi.fn();
    render(<LimitSelector currentLimit={20} onLimitChange={mockChange} />);
    const input = screen.getByRole("spinbutton");
    expect((input as HTMLInputElement).value).toBe("20");
  });

  it("calls onLimitChange when Enter is pressed", async () => {
    const mockChange = vi.fn();
    render(<LimitSelector currentLimit={10} onLimitChange={mockChange} />);

    const input = screen.getByRole("spinbutton");
    await userEvent.clear(input);
    await userEvent.type(input, "25");
    await userEvent.keyboard("{Enter}");

    expect(mockChange).toHaveBeenCalledWith(25);
  });

  it("clamps value to 1–100 range (too low → 10, too high → 100)", async () => {
    const mockChange = vi.fn();
    render(<LimitSelector currentLimit={10} onLimitChange={mockChange} />);

    const input = screen.getByRole("spinbutton");

    // Too low
    await userEvent.clear(input);
    await userEvent.type(input, "0");
    await userEvent.keyboard("{Enter}");
    expect(mockChange).toHaveBeenLastCalledWith(10);
    expect((input as HTMLInputElement).value).toBe("10");

    // Too high
    await userEvent.clear(input);
    await userEvent.type(input, "150");
    await userEvent.keyboard("{Enter}");
    expect(mockChange).toHaveBeenLastCalledWith(100);
    expect((input as HTMLInputElement).value).toBe("100");
  });

  it("applies the value when input loses focus (onBlur)", async () => {
    const mockChange = vi.fn();
    render(<LimitSelector currentLimit={10} onLimitChange={mockChange} />);

    const input = screen.getByRole("spinbutton");
    await userEvent.clear(input);
    await userEvent.type(input, "42");
    fireEvent.blur(input); // simulate blur
    expect(mockChange).toHaveBeenCalledWith(42);
  });

  it("updates inputValue when currentLimit prop changes", async () => {
    const mockChange = vi.fn();
    const { rerender } = render(
      <LimitSelector currentLimit={10} onLimitChange={mockChange} />
    );

    const input = screen.getByRole("spinbutton");
    expect((input as HTMLInputElement).value).toBe("10");

    rerender(<LimitSelector currentLimit={50} onLimitChange={mockChange} />);
    expect((input as HTMLInputElement).value).toBe("50");
  });

  it("resets to 10 if input is not a number", async () => {
    const mockChange = vi.fn();
    render(<LimitSelector currentLimit={10} onLimitChange={mockChange} />);

    const input = screen.getByRole("spinbutton");
    await userEvent.clear(input);
    await userEvent.type(input, "abc");
    await userEvent.keyboard("{Enter}");

    expect(mockChange).toHaveBeenCalledWith(10);
    expect((input as HTMLInputElement).value).toBe("10");
  });
});
