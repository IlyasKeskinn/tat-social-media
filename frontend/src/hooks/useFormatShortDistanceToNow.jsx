import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

const useFormatShortDistanceToNow = (date) => {
  const [shortDistance, setShortDistance] = useState("");

  useEffect(() => {
    const distance = formatDistanceToNow(date);
    const formattedDistance = distance
      .replace(/about|almost|over|less than|/g, "") // Remove unnecessary words
      .replace(/\bminute\b|\bminutes\b/g, "m")
      .replace(/\bhour\b|\bhours\b/g, "h")
      .replace(/\bday\b|\bdays\b/g, "d")
      .replace(/\bmonth\b|\bmonths\b/g, "mo")
      .replace(/\byear\b|\byears\b/g, "y");

    setShortDistance(formattedDistance);
  }, [date]);

  return shortDistance;
};

export default useFormatShortDistanceToNow;
