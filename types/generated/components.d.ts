import type { Schema, Struct } from '@strapi/strapi';

export interface ProductDimensions extends Struct.ComponentSchema {
  collectionName: 'components_product_dimensions';
  info: {
    description: 'Product dimensions';
    displayName: 'dimensions';
    icon: 'arrows-alt';
  };
  attributes: {
    height: Schema.Attribute.Decimal;
    length: Schema.Attribute.Decimal;
    width: Schema.Attribute.Decimal;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'product.dimensions': ProductDimensions;
    }
  }
}
