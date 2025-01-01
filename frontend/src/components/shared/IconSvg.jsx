import PropTypes from "prop-types";

export const HomeSVG = ({ isActive, width = "24px", height = "24px" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 50 50"
      fill={isActive ? "currentColor" : "transparent"}
      stroke="currentColor"
      strokeWidth="5"
    >
      <path d="M 25 1.0507812 C 24.7825 1.0507812 24.565859 1.1197656 24.380859 1.2597656 L 1.3808594 19.210938 C 0.95085938 19.550938 0.8709375 20.179141 1.2109375 20.619141 C 1.5509375 21.049141 2.1791406 21.129062 2.6191406 20.789062 L 4 19.710938 L 4 46 C 4 46.55 4.45 47 5 47 L 19 47 L 19 29 L 31 29 L 31 47 L 45 47 C 45.55 47 46 46.55 46 46 L 46 19.710938 L 47.380859 20.789062 C 47.570859 20.929063 47.78 21 48 21 C 48.3 21 48.589063 20.869141 48.789062 20.619141 C 49.129063 20.179141 49.049141 19.550938 48.619141 19.210938 L 25.619141 1.2597656 C 25.434141 1.1197656 25.2175 1.0507812 25 1.0507812 z M 35 5 L 35 6.0507812 L 41 10.730469 L 41 5 L 35 5 z"></path>
    </svg>
  );
};

HomeSVG.propTypes = {
  isActive: PropTypes.bool.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
};

export const ExploreSVG = ({ isActive, width = "24px", height = "24px" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={isActive ? "currentColor" : "transparent"}
      viewBox="0 0 24 24"
    >
      <path
        d="M9 20L3 17V4L9 7M9 20L15 17M9 20V7M15 17L21 20V7L15 4M15 17V4M9 7L15 4"
        stroke="currentColor"
        strokeWidth="2px"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

ExploreSVG.propTypes = {
  isActive: PropTypes.bool.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
};
export const SearchSVG = ({ isActive, width = "24px", height = "24px" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
        stroke="currentColor"
        strokeWidth="3"
        fill={isActive ? "currentColor" : "transparent"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
SearchSVG.propTypes = {
  isActive: PropTypes.bool.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
};

export const MessageSVG = ({ width = "24px", height = "24px" }) => {
  return (
    <svg
      aria-label="send"
      fill="currentColor"
      width={width}
      height={height}
      viewBox="0 0 24.00 24.00"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="1"
      transform="matrix(1, 0, 0, 1, 0, 0)"
    >
      <title>Send</title>
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="#CCCCCC"
        strokeWidth="1"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M22.7,3.55a1,1,0,0,1,0,1.422L18.77,8.862a9.542,9.542,0,0,1-.682,12.849,1,1,0,0,1-1.406,0L11.5,16.59,9.046,21.451a1,1,0,0,1-.732.536.959.959,0,0,1-.16.013,1,1,0,0,1-.7-.289L1.3,15.624a1,1,0,0,1,.26-1.607l4.9-2.422L1.3,6.493a1,1,0,0,1,0-1.422,9.733,9.733,0,0,1,10.642-2.05,1,1,0,1,1-.773,1.843,7.748,7.748,0,0,0-7.7.964l5.388,5.33a1,1,0,0,1-.26,1.608L3.7,15.188l4.181,4.135,2.457-4.861a1,1,0,0,1,1.6-.26l5.406,5.347a7.541,7.541,0,0,0-.658-10.012,1,1,0,0,1,0-1.422l3.785-3.744a3.392,3.392,0,0,0-3.918.6L12.7,8.776a1,1,0,0,1-1.7-.607,1.051,1.051,0,0,1,.446-.967L15.143,3.55A5.4,5.4,0,0,1,22.7,3.55Z"></path>
      </g>
    </svg>
  );
};
MessageSVG.propTypes = {
  isActive: PropTypes.bool.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
};

export const BookmarkSVG = ({ isActive, width = "24px", height = "24px" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M9 14H15M4.6 10H19.4C19.9601 10 20.2401 10 20.454 9.89101C20.6422 9.79513 20.7951 9.64215 20.891 9.45399C21 9.24008 21 8.96005 21 8.4V5.6C21 5.03995 21 4.75992 20.891 4.54601C20.7951 4.35785 20.6422 4.20487 20.454 4.10899C20.2401 4 19.9601 4 19.4 4H4.6C4.03995 4 3.75992 4 3.54601 4.10899C3.35785 4.20487 3.20487 4.35785 3.10899 4.54601C3 4.75992 3 5.03995 3 5.6V8.4C3 8.96005 3 9.24008 3.10899 9.45399C3.20487 9.64215 3.35785 9.79513 3.54601 9.89101C3.75992 10 4.03995 10 4.6 10ZM5 10H19V16.8C19 17.9201 19 18.4802 18.782 18.908C18.5903 19.2843 18.2843 19.5903 17.908 19.782C17.4802 20 16.9201 20 15.8 20H8.2C7.07989 20 6.51984 20 6.09202 19.782C5.71569 19.5903 5.40973 19.2843 5.21799 18.908C5 18.4802 5 17.9201 5 16.8V10Z"
        stroke="currentColor"
        fill={isActive ? "#B4D6CD" : "transparent"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

BookmarkSVG.propTypes = {
  isActive: PropTypes.bool.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
};
