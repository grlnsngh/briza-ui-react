import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card, CardHeader, CardBody, CardFooter, CardImage } from "./Card";
import { Button } from "../Button";
import { Skeleton } from "../Skeleton";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A flexible card component with header, body, and footer sections. Supports hover states, loading states, images, and action buttons for maximum reusability.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "bordered", "shadow", "elevated"],
      description: "Visual variant of the card",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the card",
    },
    radius: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
      description: "Border radius of the card",
    },
    isHoverable: {
      control: "boolean",
      description: "Whether the card has hover effects",
    },
    isPressable: {
      control: "boolean",
      description: "Whether the card has pressed state",
    },
    isDisabled: {
      control: "boolean",
      description: "Whether the card is disabled",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

/**
 * Default card with basic content
 */
export const Default: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
          Card Title
        </h3>
      </CardHeader>
      <CardBody>
        <p style={{ margin: 0, color: "var(--color-default-600)" }}>
          This is a basic card with header and body sections. It uses the
          default variant and medium size.
        </p>
      </CardBody>
    </Card>
  ),
};

/**
 * Card with all sections (header, body, footer)
 */
export const WithAllSections: Story = {
  render: () => (
    <Card variant="shadow">
      <CardHeader divider>
        <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
          Complete Card
        </h3>
      </CardHeader>
      <CardBody>
        <p style={{ margin: 0, color: "var(--color-default-600)" }}>
          This card demonstrates all sections: header with divider, body with
          content, and footer with actions.
        </p>
      </CardBody>
      <CardFooter divider>
        <Button size="sm" variant="bordered">
          Cancel
        </Button>
        <Button size="sm" color="primary">
          Confirm
        </Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * Card with image
 */
export const WithImage: Story = {
  render: () => (
    <Card variant="shadow" style={{ maxWidth: "400px" }}>
      <CardImage
        src="https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=200&fit=crop"
        alt="Beautiful landscape"
      />
      <CardHeader>
        <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
          Beautiful Landscape
        </h3>
      </CardHeader>
      <CardBody>
        <p style={{ margin: 0, color: "var(--color-default-600)" }}>
          A stunning view of nature captured in this photograph. The image is
          properly sized and optimized for the card.
        </p>
      </CardBody>
      <CardFooter>
        <Button size="sm" variant="light">
          Learn More
        </Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * Hoverable card - lifts up with enhanced shadow on hover
 * Use for cards that navigate or reveal more information
 */
export const Hoverable: Story = {
  render: () => (
    <Card
      variant="shadow"
      isHoverable
      onClick={() => alert("Card clicked!")}
      style={{ maxWidth: "400px" }}
    >
      <CardHeader>
        <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
          Hoverable Card
        </h3>
        <span
          style={{ fontSize: "0.875rem", color: "var(--color-default-500)" }}
        >
          Hover Effect
        </span>
      </CardHeader>
      <CardBody>
        <p style={{ margin: 0, color: "var(--color-default-600)" }}>
          Hover over this card to see it lift slightly with enhanced shadow.
          Perfect for cards that navigate to details or show more information.
        </p>
      </CardBody>
    </Card>
  ),
};

/**
 * Pressable card - scales down on click
 * Use for cards that perform an action like selecting an option
 */
export const Pressable: Story = {
  render: () => (
    <Card
      variant="bordered"
      isPressable
      onClick={() => alert("Card pressed!")}
      style={{ maxWidth: "400px" }}
    >
      <CardHeader>
        <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
          Pressable Card
        </h3>
        <span
          style={{ fontSize: "0.875rem", color: "var(--color-default-500)" }}
        >
          Press Effect
        </span>
      </CardHeader>
      <CardBody>
        <p style={{ margin: 0, color: "var(--color-default-600)" }}>
          Click and hold to see the pressed state. The card scales down slightly
          when pressed. Great for selection cards or button-like interactions.
        </p>
      </CardBody>
    </Card>
  ),
};

/**
 * Loading state with Skeleton placeholders
 * Use Skeleton component for individual elements instead of full-card overlay
 */
export const LoadingState: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(true);

    return (
      <div>
        {/* Toggle buttons */}
        <div style={{ marginBottom: "1.5rem", display: "flex", gap: "0.5rem" }}>
          <Button
            onClick={() => setIsLoading(true)}
            color={isLoading ? "primary" : "default"}
            variant={isLoading ? "solid" : "bordered"}
          >
            Loading
          </Button>
          <Button
            onClick={() => setIsLoading(false)}
            color={!isLoading ? "primary" : "default"}
            variant={!isLoading ? "solid" : "bordered"}
          >
            Loaded
          </Button>
        </div>

        {/* Card with same structure whether loading or loaded */}
        <Card
          variant="shadow"
          style={{ maxWidth: "400px", minHeight: "500px" }}
        >
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
                aria-hidden={isLoading}
              >
                {isLoading ? (
                  <Skeleton variant="circular" width={48} height={48} />
                ) : (
                  <img
                    src="https://i.pravatar.cc/96?img=12"
                    alt="User avatar"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4
                  style={{
                    margin: 0,
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    lineHeight: 1.4,
                  }}
                >
                  {isLoading ? (
                    <Skeleton
                      variant="text"
                      width="60%"
                      height={20}
                      style={{ marginBottom: "0.25rem" }}
                    />
                  ) : (
                    "Sarah Anderson"
                  )}
                </h4>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.875rem",
                    color: "var(--color-default-600)",
                    lineHeight: 1.4,
                  }}
                >
                  {isLoading ? (
                    <Skeleton variant="text" width="45%" height={16} />
                  ) : (
                    "Product Designer"
                  )}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <div style={{ marginBottom: "1rem" }}>
              {isLoading ? (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={200}
                  style={{ borderRadius: "8px" }}
                />
              ) : (
                <img
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=200&fit=crop"
                  alt="Design workspace"
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              )}
            </div>
            <div style={{ minHeight: "76px" }}>
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
                  <Skeleton variant="text" width="70%" height={16} />
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
                  Creating beautiful and intuitive user experiences for modern
                  web applications. Passionate about design systems and
                  accessibility.
                </p>
              )}
            </div>
          </CardBody>
          <CardFooter>
            {isLoading ? (
              <>
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
              </>
            ) : (
              <>
                <Button variant="bordered">Message</Button>
                <Button color="primary">Follow</Button>
              </>
            )}
          </CardFooter>
        </Card>
      </div>
    );
  },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  render: () => (
    <Card
      variant="bordered"
      isDisabled
      onClick={() => alert("This should not trigger")}
      style={{ maxWidth: "400px" }}
    >
      <CardHeader>
        <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
          Disabled Card
        </h3>
      </CardHeader>
      <CardBody>
        <p style={{ margin: 0, color: "var(--color-default-600)" }}>
          This card is disabled and cannot be interacted with. Notice the
          reduced opacity.
        </p>
      </CardBody>
    </Card>
  ),
};

/**
 * Compare Hoverable vs Pressable effects
 */
export const HoverableVsPressable: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1.5rem",
        maxWidth: "900px",
      }}
    >
      <Card
        variant="shadow"
        isHoverable
        onClick={() => alert("Hoverable card clicked")}
      >
        <CardHeader>
          <div>
            <h3 style={{ margin: 0, fontSize: "1.125rem", fontWeight: 600 }}>
              isHoverable
            </h3>
            <p
              style={{
                margin: "0.25rem 0 0",
                fontSize: "0.75rem",
                color: "var(--color-primary)",
              }}
            >
              Hover to see effect
            </p>
          </div>
        </CardHeader>
        <CardBody>
          <p
            style={{
              margin: 0,
              fontSize: "0.875rem",
              color: "var(--color-default-600)",
            }}
          >
            • Lifts slightly on hover
            <br />
            • Enhanced shadow
            <br />
            • Smooth transition
            <br />• Use for: Navigation, Details
          </p>
        </CardBody>
      </Card>

      <Card
        variant="shadow"
        isPressable
        onClick={() => alert("Pressable card clicked")}
      >
        <CardHeader>
          <div>
            <h3 style={{ margin: 0, fontSize: "1.125rem", fontWeight: 600 }}>
              isPressable
            </h3>
            <p
              style={{
                margin: "0.25rem 0 0",
                fontSize: "0.75rem",
                color: "var(--color-success)",
              }}
            >
              Click and hold
            </p>
          </div>
        </CardHeader>
        <CardBody>
          <p
            style={{
              margin: 0,
              fontSize: "0.875rem",
              color: "var(--color-default-600)",
            }}
          >
            • Scales down when pressed
            <br />
            • Tactile feedback
            <br />
            • Button-like feel
            <br />• Use for: Selection, Actions
          </p>
        </CardBody>
      </Card>
    </div>
  ),
};

/**
 * Different variants
 */
export const Variants: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "1rem",
      }}
    >
      <Card variant="default">
        <CardHeader>
          <h4 style={{ margin: 0 }}>Default</h4>
        </CardHeader>
        <CardBody>
          <p style={{ margin: 0, fontSize: "0.875rem" }}>
            Basic border styling
          </p>
        </CardBody>
      </Card>

      <Card variant="bordered">
        <CardHeader>
          <h4 style={{ margin: 0 }}>Bordered</h4>
        </CardHeader>
        <CardBody>
          <p style={{ margin: 0, fontSize: "0.875rem" }}>Thicker border</p>
        </CardBody>
      </Card>

      <Card variant="shadow">
        <CardHeader>
          <h4 style={{ margin: 0 }}>Shadow</h4>
        </CardHeader>
        <CardBody>
          <p style={{ margin: 0, fontSize: "0.875rem" }}>
            Subtle shadow effect
          </p>
        </CardBody>
      </Card>

      <Card variant="elevated">
        <CardHeader>
          <h4 style={{ margin: 0 }}>Elevated</h4>
        </CardHeader>
        <CardBody>
          <p style={{ margin: 0, fontSize: "0.875rem" }}>Prominent elevation</p>
        </CardBody>
      </Card>
    </div>
  ),
};

/**
 * Different sizes
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Card size="sm" variant="bordered">
        <CardHeader>
          <h4 style={{ margin: 0 }}>Small Card</h4>
        </CardHeader>
        <CardBody>
          <p style={{ margin: 0, fontSize: "0.875rem" }}>
            Compact padding for small content
          </p>
        </CardBody>
      </Card>

      <Card size="md" variant="bordered">
        <CardHeader>
          <h4 style={{ margin: 0 }}>Medium Card</h4>
        </CardHeader>
        <CardBody>
          <p style={{ margin: 0, fontSize: "0.875rem" }}>
            Standard padding (default)
          </p>
        </CardBody>
      </Card>

      <Card size="lg" variant="bordered">
        <CardHeader>
          <h4 style={{ margin: 0 }}>Large Card</h4>
        </CardHeader>
        <CardBody>
          <p style={{ margin: 0, fontSize: "0.875rem" }}>
            Generous padding for spacious layouts
          </p>
        </CardBody>
      </Card>
    </div>
  ),
};

/**
 * Product card example
 */
export const ProductCard: Story = {
  render: () => (
    <Card variant="shadow" isHoverable style={{ maxWidth: "350px" }}>
      <CardImage
        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=350&h=250&fit=crop"
        alt="Premium Watch"
      />
      <CardHeader>
        <div>
          <h3 style={{ margin: 0, fontSize: "1.125rem", fontWeight: 600 }}>
            Premium Watch
          </h3>
          <p
            style={{
              margin: "0.25rem 0 0",
              fontSize: "0.875rem",
              color: "var(--color-default-500)",
            }}
          >
            Luxury Collection
          </p>
        </div>
        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "var(--color-primary)",
          }}
        >
          $299
        </div>
      </CardHeader>
      <CardBody>
        <p
          style={{
            margin: 0,
            fontSize: "0.875rem",
            color: "var(--color-default-600)",
          }}
        >
          Elegant timepiece with premium materials and Swiss movement.
          Water-resistant up to 50m.
        </p>
      </CardBody>
      <CardFooter>
        <Button size="sm" variant="light">
          Add to Wishlist
        </Button>
        <Button size="sm" color="primary">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * User profile card
 */
export const UserProfileCard: Story = {
  render: () => (
    <Card variant="elevated" style={{ maxWidth: "350px" }}>
      <CardImage
        src="https://i.pravatar.cc/350?img=12"
        alt="User avatar"
        objectFit="cover"
      />
      <CardHeader>
        <div>
          <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
            Jane Cooper
          </h3>
          <p
            style={{
              margin: "0.25rem 0 0",
              fontSize: "0.875rem",
              color: "var(--color-default-500)",
            }}
          >
            Product Designer
          </p>
        </div>
      </CardHeader>
      <CardBody>
        <p
          style={{
            margin: 0,
            fontSize: "0.875rem",
            color: "var(--color-default-600)",
          }}
        >
          Passionate about creating beautiful and intuitive user experiences. 5+
          years in UX/UI design.
        </p>
        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: "1.125rem" }}>234</div>
            <div
              style={{ fontSize: "0.75rem", color: "var(--color-default-500)" }}
            >
              Posts
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: "1.125rem" }}>2.5K</div>
            <div
              style={{ fontSize: "0.75rem", color: "var(--color-default-500)" }}
            >
              Followers
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: "1.125rem" }}>843</div>
            <div
              style={{ fontSize: "0.75rem", color: "var(--color-default-500)" }}
            >
              Following
            </div>
          </div>
        </div>
      </CardBody>
      <CardFooter divider>
        <Button size="sm" variant="bordered" style={{ flex: 1 }}>
          Message
        </Button>
        <Button size="sm" color="primary" style={{ flex: 1 }}>
          Follow
        </Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * Blog post card
 */
export const BlogPostCard: Story = {
  render: () => (
    <Card variant="shadow" isHoverable style={{ maxWidth: "400px" }}>
      <CardImage
        src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=200&fit=crop"
        alt="Blog post cover"
      />
      <CardHeader>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: "0.75rem",
              color: "var(--color-primary)",
              fontWeight: 600,
              marginBottom: "0.5rem",
            }}
          >
            TECHNOLOGY
          </div>
          <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
            Getting Started with React 19
          </h3>
        </div>
      </CardHeader>
      <CardBody>
        <p
          style={{
            margin: "0 0 1rem",
            fontSize: "0.875rem",
            color: "var(--color-default-600)",
          }}
        >
          Learn about the exciting new features in React 19 and how to migrate
          your existing applications.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <img
            src="https://i.pravatar.cc/32?img=3"
            alt="Author"
            style={{ width: "32px", height: "32px", borderRadius: "50%" }}
          />
          <div>
            <div style={{ fontSize: "0.875rem", fontWeight: 500 }}>
              John Smith
            </div>
            <div
              style={{ fontSize: "0.75rem", color: "var(--color-default-500)" }}
            >
              Oct 10, 2025 · 5 min read
            </div>
          </div>
        </div>
      </CardBody>
      <CardFooter>
        <Button size="sm" variant="light">
          Read More
        </Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * Statistics card
 */
export const StatisticsCard: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1rem",
      }}
    >
      <Card variant="shadow" size="sm">
        <CardBody>
          <div
            style={{
              fontSize: "0.875rem",
              color: "var(--color-default-500)",
              marginBottom: "0.5rem",
            }}
          >
            Total Sales
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 700 }}>$45,231</div>
          <div
            style={{
              fontSize: "0.75rem",
              color: "var(--color-success)",
              marginTop: "0.5rem",
            }}
          >
            ↑ 12% from last month
          </div>
        </CardBody>
      </Card>

      <Card variant="shadow" size="sm">
        <CardBody>
          <div
            style={{
              fontSize: "0.875rem",
              color: "var(--color-default-500)",
              marginBottom: "0.5rem",
            }}
          >
            New Users
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 700 }}>1,234</div>
          <div
            style={{
              fontSize: "0.75rem",
              color: "var(--color-success)",
              marginTop: "0.5rem",
            }}
          >
            ↑ 8% from last month
          </div>
        </CardBody>
      </Card>

      <Card variant="shadow" size="sm">
        <CardBody>
          <div
            style={{
              fontSize: "0.875rem",
              color: "var(--color-default-500)",
              marginBottom: "0.5rem",
            }}
          >
            Conversion
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 700 }}>3.2%</div>
          <div
            style={{
              fontSize: "0.75rem",
              color: "var(--color-danger)",
              marginTop: "0.5rem",
            }}
          >
            ↓ 2% from last month
          </div>
        </CardBody>
      </Card>
    </div>
  ),
};

/**
 * Controlled loading state with Skeleton
 */
export const ControlledLoading: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleLoad = () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };

    return (
      <Card variant="shadow" style={{ maxWidth: "400px" }}>
        <CardHeader>
          {isLoading ? (
            <Skeleton variant="text" width="60%" height={24} />
          ) : (
            <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
              Product Title
            </h3>
          )}
        </CardHeader>
        <CardBody>
          {isLoading ? (
            <>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={150}
                style={{ marginBottom: "1rem" }}
              />
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
            </>
          ) : (
            <>
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=150&fit=crop"
                alt="Product"
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "1rem",
                }}
              />
              <p style={{ margin: 0, color: "var(--color-default-600)" }}>
                This is a product description that appears after loading
                completes. The skeleton placeholders maintain the layout during
                loading.
              </p>
            </>
          )}
        </CardBody>
        <CardFooter>
          <Button onClick={handleLoad} disabled={isLoading}>
            {isLoading ? "Loading..." : "Load Content"}
          </Button>
        </CardFooter>
      </Card>
    );
  },
};

/**
 * Grid of cards
 */
export const CardGrid: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "1.5rem",
      }}
    >
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card key={i} variant="shadow" isHoverable>
          <CardImage
            src={`https://picsum.photos/seed/${i}/280/180`}
            alt={`Card ${i}`}
          />
          <CardHeader>
            <h4 style={{ margin: 0 }}>Card Title {i}</h4>
          </CardHeader>
          <CardBody>
            <p style={{ margin: 0, fontSize: "0.875rem" }}>
              This is card number {i} in the grid layout.
            </p>
          </CardBody>
        </Card>
      ))}
    </div>
  ),
};

/**
 * Playground for testing all features
 */
export const Playground: Story = {
  args: {
    variant: "shadow",
    size: "md",
    radius: "md",
    isHoverable: false,
    isPressable: false,
    isDisabled: false,
  },
  render: (args) => (
    <Card {...args} style={{ maxWidth: "400px" }}>
      <CardHeader divider>
        <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
          Playground Card
        </h3>
      </CardHeader>
      <CardBody>
        <p style={{ margin: 0, color: "var(--color-default-600)" }}>
          Use the controls to test different card configurations. Try different
          variants, sizes, and states.
        </p>
      </CardBody>
      <CardFooter divider>
        <Button size="sm" variant="bordered">
          Cancel
        </Button>
        <Button size="sm" color="primary">
          Save
        </Button>
      </CardFooter>
    </Card>
  ),
};
