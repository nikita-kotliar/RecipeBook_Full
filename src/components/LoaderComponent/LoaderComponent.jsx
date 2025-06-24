import { ColorRing } from "react-loader-spinner";
const LoaderComponent = ({ width, height }) => {
  return (
    <ColorRing
      visible={true}
      height={height}
      width={width}
      ariaLabel="color-ring-loading"
      wrapperStyle={{}}
      wrapperClass="color-ring-wrapper"
    />
  );
};
export default LoaderComponent;
