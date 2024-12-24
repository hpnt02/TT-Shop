
import { useMediaQuery } from 'react-responsive'

//Giao diện máy tính có chiều dài > 992px
export const ExtraLarge = ({ children }) => {
  const isExtraLarge = useMediaQuery({ minWidth: 1200})
  return isExtraLarge ? children : null
}

//Giao diện tablet có chiều dài từ 768px tới 991px
export const Large = ({ children }) => {
  const isLarge = useMediaQuery({ minWidth: 992, maxWidth: 1119 })
  return isLarge ? children : null
}

//Giao diện mobile có chiều dài < 767px
export const Medium = ({ children }) => {
  const isMedium = useMediaQuery({  minWidth: 768, maxWidth: 991})
  return isMedium ? children : null
}

//Giao diện máy tính và tablet có chiều dài > 768px
export const Small = ({ children }) => {
  const isSmall = useMediaQuery({  minWidth: 576, maxWidth: 767 })
  return isSmall ? children : null
}

export const XSmall = ({ children }) => {
  const isXSmall = useMediaQuery({  maxWidth: 575})
  return isXSmall ? children : null
}

export const TabletAndDestop = ({ children }) => {
  const isResponsive = useMediaQuery({ minWidth: 768, maxWidth: 1119 });
  return isResponsive ? children : null;
};

export const TabletAndDestopLarge = ({ children }) => {
  const isResponsive = useMediaQuery({ minWidth: 768 });
  return isResponsive ? children : null;
};

export const MobileAndTablet = ({ children }) => {
  const isResponsive = useMediaQuery({ maxWidth: 767 });
  return isResponsive ? children : null;
};