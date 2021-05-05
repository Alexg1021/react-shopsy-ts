// 

enum TypeColor {
    "electronics" = "bg-warning",
    "jewelery" = "bg-primary",
    "men's clothing" = "bg-danger",
    "women's clothing" = "bg-info"
  }

  export const SetBadgeColor = (type: string): string => {
    switch (type) {
      case "electronics":
        return TypeColor.electronics;
      case "jewelery":
        return TypeColor.jewelery;
      case "men's clothing":
        return TypeColor["men's clothing"];
      case "women's clothing":
        return TypeColor["women's clothing"];
      default:
        return '#333';
    }
  };

  export const priceDecimalFormat = (price:number): string => {
      return price.toFixed(2);
  }