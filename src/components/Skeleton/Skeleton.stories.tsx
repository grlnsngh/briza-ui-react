import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "./Skeleton";
import { Card, CardHeader, CardBody, CardFooter } from "../Card";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Skeleton component for showing loading states. Use for individual elements instead of full-screen loaders. Provides a shimmer effect that indicates content is being loaded.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["text", "circular", "rectangular"],
      description: "The type of skeleton to display",
    },
    width: {
      control: "text",
      description: "Width of the skeleton (CSS value)",
    },
    height: {
      control: "text",
      description: "Height of the skeleton (CSS value)",
    },
    animation: {
      control: "boolean",
      description: "Whether to show shimmer animation",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

/**
 * Text skeleton for loading text content
 */
export const Text: Story = {
  args: {
    variant: "text",
    width: "100%",
  },
};

/**
 * Circular skeleton for avatars or icons
 */
export const Circular: Story = {
  args: {
    variant: "circular",
    width: 40,
    height: 40,
  },
};

/**
 * Rectangular skeleton for images or blocks
 */
export const Rectangular: Story = {
  args: {
    variant: "rectangular",
    width: "100%",
    height: 200,
  },
};

/**
 * Loading card with skeleton elements
 */
export const LoadingCard: Story = {
  render: () => (
    <Card variant="shadow" style={{ maxWidth: "400px" }}>
      <CardHeader>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <Skeleton variant="circular" width={48} height={48} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <Skeleton
              variant="text"
              width="60%"
              height={20}
              style={{ marginBottom: "0.25rem" }}
            />
            <Skeleton variant="text" width="45%" height={16} />
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <div style={{ marginBottom: "1rem" }}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={200}
            style={{ borderRadius: "8px" }}
          />
        </div>
        <div style={{ minHeight: "76px" }}>
          <Skeleton
            variant="text"
            width="100%"
            height={16}
            style={{ marginBottom: "0.5rem" }}
          />
          <Skeleton
            variant="text"
            width="100%"
            height={16}
            style={{ marginBottom: "0.5rem" }}
          />
          <Skeleton variant="text" width="70%" height={16} />
        </div>
      </CardBody>
      <CardFooter>
        <Skeleton
          variant="rectangular"
          width={96}
          height={36}
          style={{ borderRadius: "8px" }}
        />
        <Skeleton
          variant="rectangular"
          width={104}
          height={36}
          style={{ borderRadius: "8px" }}
        />
      </CardFooter>
    </Card>
  ),
};

/**
 * Product card loading state
 */
export const ProductCardLoading: Story = {
  render: () => (
    <Card variant="shadow" style={{ maxWidth: "350px" }}>
      <div
        style={{
          margin:
            "calc(var(--spacing-4) * -1) calc(var(--spacing-4) * -1) var(--spacing-4)",
          borderTopLeftRadius: "var(--radius-md)",
          borderTopRightRadius: "var(--radius-md)",
          overflow: "hidden",
        }}
      >
        <Skeleton variant="rectangular" width="100%" height={250} />
      </div>
      <CardHeader>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "1rem",
            width: "100%",
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <Skeleton
              variant="text"
              width="70%"
              height={24}
              style={{ marginBottom: "0.5rem" }}
            />
            <Skeleton variant="text" width="40%" height={16} />
          </div>
          <Skeleton
            variant="text"
            width={60}
            height={28}
            style={{ flexShrink: 0 }}
          />
        </div>
      </CardHeader>
      <CardBody>
        <div style={{ minHeight: "72px" }}>
          <Skeleton
            variant="text"
            width="100%"
            height={16}
            style={{ marginBottom: "0.5rem" }}
          />
          <Skeleton
            variant="text"
            width="100%"
            height={16}
            style={{ marginBottom: "0.5rem" }}
          />
          <Skeleton variant="text" width="80%" height={16} />
        </div>
      </CardBody>
      <CardFooter>
        <Skeleton
          variant="rectangular"
          width={120}
          height={36}
          style={{ borderRadius: "8px" }}
        />
        <Skeleton
          variant="rectangular"
          width={100}
          height={36}
          style={{ borderRadius: "8px" }}
        />
      </CardFooter>
    </Card>
  ),
};

/**
 * Multiple skeletons in different sizes
 */
export const DifferentSizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: "400px",
      }}
    >
      <div>
        <p
          style={{
            marginBottom: "0.5rem",
            fontSize: "0.875rem",
            fontWeight: 500,
          }}
        >
          Title (Large)
        </p>
        <Skeleton variant="text" width="80%" height={32} />
      </div>
      <div>
        <p
          style={{
            marginBottom: "0.5rem",
            fontSize: "0.875rem",
            fontWeight: 500,
          }}
        >
          Subtitle (Medium)
        </p>
        <Skeleton variant="text" width="60%" height={24} />
      </div>
      <div>
        <p
          style={{
            marginBottom: "0.5rem",
            fontSize: "0.875rem",
            fontWeight: 500,
          }}
        >
          Body Text (Small)
        </p>
        <Skeleton variant="text" width="100%" height={16} />
        <Skeleton
          variant="text"
          width="100%"
          height={16}
          style={{ marginTop: "0.5rem" }}
        />
        <Skeleton
          variant="text"
          width="90%"
          height={16}
          style={{ marginTop: "0.5rem" }}
        />
      </div>
      <div>
        <p
          style={{
            marginBottom: "0.5rem",
            fontSize: "0.875rem",
            fontWeight: 500,
          }}
        >
          Avatar Sizes
        </p>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton variant="circular" width={48} height={48} />
          <Skeleton variant="circular" width={64} height={64} />
        </div>
      </div>
    </div>
  ),
};

/**
 * List with skeleton items
 */
export const ListLoading: Story = {
  render: () => (
    <div style={{ maxWidth: "500px" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          style={{
            display: "flex",
            gap: "1rem",
            padding: "1rem",
            borderBottom: "1px solid var(--color-default-200)",
          }}
        >
          <Skeleton variant="circular" width={48} height={48} />
          <div style={{ flex: 1 }}>
            <Skeleton
              variant="text"
              width="70%"
              height={18}
              style={{ marginBottom: "0.5rem" }}
            />
            <Skeleton
              variant="text"
              width="100%"
              height={14}
              style={{ marginBottom: "0.25rem" }}
            />
            <Skeleton variant="text" width="40%" height={12} />
          </div>
        </div>
      ))}
    </div>
  ),
};

/**
 * Grid of loading cards
 */
export const GridLoading: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "1.5rem",
      }}
    >
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} variant="shadow">
          <Skeleton variant="rectangular" width="100%" height={180} />
          <CardBody>
            <Skeleton
              variant="text"
              width="80%"
              height={20}
              style={{ marginBottom: "0.5rem" }}
            />
            <Skeleton
              variant="text"
              width="100%"
              height={14}
              style={{ marginBottom: "0.25rem" }}
            />
            <Skeleton variant="text" width="90%" height={14} />
          </CardBody>
        </Card>
      ))}
    </div>
  ),
};

/**
 * With and without animation
 */
export const WithoutAnimation: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "2rem", maxWidth: "800px" }}>
      <div style={{ flex: 1 }}>
        <h4 style={{ marginBottom: "1rem" }}>With Animation (Default)</h4>
        <Card variant="bordered">
          <CardBody>
            <Skeleton
              variant="text"
              width="100%"
              style={{ marginBottom: "0.5rem" }}
            />
            <Skeleton
              variant="text"
              width="100%"
              style={{ marginBottom: "0.5rem" }}
            />
            <Skeleton variant="text" width="70%" />
          </CardBody>
        </Card>
      </div>
      <div style={{ flex: 1 }}>
        <h4 style={{ marginBottom: "1rem" }}>Without Animation</h4>
        <Card variant="bordered">
          <CardBody>
            <Skeleton
              variant="text"
              width="100%"
              animation={false}
              style={{ marginBottom: "0.5rem" }}
            />
            <Skeleton
              variant="text"
              width="100%"
              animation={false}
              style={{ marginBottom: "0.5rem" }}
            />
            <Skeleton variant="text" width="70%" animation={false} />
          </CardBody>
        </Card>
      </div>
    </div>
  ),
};

/**
 * Interactive toggle between loading and loaded states
 * Demonstrates same structure pattern
 */
export const InteractiveToggle: Story = {
  render: () => {
    const [isLoading, setIsLoading] = React.useState(true);

    return (
      <div>
        {/* Toggle buttons */}
        <div style={{ marginBottom: "1.5rem", display: "flex", gap: "0.5rem" }}>
          <button
            onClick={() => setIsLoading(true)}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              border: isLoading ? "2px solid #0070f3" : "1px solid #ddd",
              background: isLoading ? "#0070f3" : "white",
              color: isLoading ? "white" : "#333",
              fontWeight: isLoading ? 600 : 400,
              cursor: "pointer",
            }}
          >
            Loading
          </button>
          <button
            onClick={() => setIsLoading(false)}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              border: !isLoading ? "2px solid #0070f3" : "1px solid #ddd",
              background: !isLoading ? "#0070f3" : "white",
              color: !isLoading ? "white" : "#333",
              fontWeight: !isLoading ? 600 : 400,
              cursor: "pointer",
            }}
          >
            Loaded
          </button>
        </div>

        {/* Product card with same structure */}
        <Card variant="shadow" style={{ maxWidth: "350px" }}>
          {/* Image area */}
          {isLoading ? (
            <Skeleton variant="rectangular" width="100%" height={250} />
          ) : (
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=350&h=250&fit=crop"
              alt="Product"
              style={{ width: "100%", height: "250px", objectFit: "cover" }}
            />
          )}

          {/* Header */}
          <CardHeader>
            <div style={{ width: "100%" }}>
              {isLoading ? (
                <>
                  <Skeleton
                    variant="text"
                    width="70%"
                    height={24}
                    style={{ marginBottom: "0.5rem" }}
                  />
                  <Skeleton variant="text" width="40%" height={16} />
                </>
              ) : (
                <>
                  <h3
                    style={{
                      margin: 0,
                      marginBottom: "0.25rem",
                      fontSize: "1.25rem",
                      fontWeight: 600,
                    }}
                  >
                    Premium Headphones
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.875rem",
                      color: "var(--color-default-600)",
                    }}
                  >
                    High-quality audio
                  </p>
                </>
              )}
            </div>
            {isLoading ? (
              <Skeleton variant="text" width={60} height={28} />
            ) : (
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "var(--color-primary)",
                }}
              >
                $299
              </div>
            )}
          </CardHeader>

          {/* Body */}
          <CardBody>
            {isLoading ? (
              <>
                <Skeleton
                  variant="text"
                  width="100%"
                  height={16}
                  style={{ marginBottom: "0.5rem" }}
                />
                <Skeleton
                  variant="text"
                  width="100%"
                  height={16}
                  style={{ marginBottom: "0.5rem" }}
                />
                <Skeleton variant="text" width="80%" height={16} />
              </>
            ) : (
              <p
                style={{
                  margin: 0,
                  fontSize: "0.9375rem",
                  lineHeight: 1.6,
                  color: "var(--color-default-700)",
                }}
              >
                Experience crystal-clear audio with active noise cancellation.
                30-hour battery life and premium comfort for all-day listening.
              </p>
            )}
          </CardBody>

          {/* Footer */}
          <CardFooter>
            {isLoading ? (
              <>
                <Skeleton variant="rectangular" width={120} height={36} />
                <Skeleton variant="rectangular" width={100} height={36} />
              </>
            ) : (
              <>
                <button
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "6px",
                    border: "1px solid #ddd",
                    background: "white",
                    cursor: "pointer",
                  }}
                >
                  Add to Wishlist
                </button>
                <button
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "6px",
                    border: "none",
                    background: "#0070f3",
                    color: "white",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Add to Cart
                </button>
              </>
            )}
          </CardFooter>
        </Card>
      </div>
    );
  },
};

/**
 * Playground for testing
 */
export const Playground: Story = {
  args: {
    variant: "text",
    width: "100%",
    height: 20,
    animation: true,
  },
};
