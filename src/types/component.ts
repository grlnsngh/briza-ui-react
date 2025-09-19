import React from "react";

/**
 * Extract props type from any React component
 * Usage: ComponentProps<typeof MyComponent>
 */
export type ComponentProps<T extends React.ElementType> =
  React.ComponentPropsWithoutRef<T>;

/**
 * Extract ref type from any React component
 * Usage: ComponentRef<typeof MyComponent>
 */
export type ComponentRef<T extends React.ElementType> = React.ComponentRef<T>;

/**
 * Polymorphic component props - allows components to render as different HTML elements
 * This is the foundation for the 'as' prop pattern used in modern UI libraries
 *
 * @param C - The default component type (e.g., 'button')
 * @param Props - Additional props specific to your component
 *
 * Example: PolymorphicProps<'button', { variant: 'primary' | 'secondary' }>
 * This allows: <Button as="a" href="..." variant="primary" />
 */
export type PolymorphicProps<
  C extends React.ElementType,
  Props = Record<string, never>
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

/**
 * The 'as' prop that allows changing the rendered element
 */
export type AsProp<C extends React.ElementType> = {
  as?: C;
};

/**
 * Helper type to omit conflicting props when using polymorphic components
 */
export type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

/**
 * Polymorphic component with ref forwarding support
 * Use this when your component needs to forward refs properly
 */
export type PolymorphicPropsWithRef<
  C extends React.ElementType,
  Props = Record<string, never>
> = PolymorphicProps<C, Props> & { ref?: PolymorphicRef<C> };

/**
 * Ref type for polymorphic components
 */
export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"];

/**
 * Conditional props based on a discriminant property
 * Useful for components where certain props should only be available when others are set
 *
 * Example:
 * type LoadingProps = ConditionalProps<
 *   { isLoading: true; loadingText?: string },
 *   { isLoading?: false; loadingText?: never }
 * >
 */
export type ConditionalProps<T, F> = T | F;

/**
 * Extract the element type from a polymorphic component's props
 * Useful for default prop inference
 */
export type ExtractElementType<T> = T extends { as: infer U }
  ? U extends React.ElementType
    ? U
    : never
  : never;
