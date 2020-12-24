import { allExclusionsSelector, fetchExclusions } from "./exclusionsSlice";
import { useDispatch, useSelector } from "react-redux";
import Exclusion from "../../domain/Exclusion";
import React from "react";

interface UseExclusionsReturnValue {
  exclusions: Exclusion[];
}

const useExclusions = (): UseExclusionsReturnValue => {
  const dispatch = useDispatch();

  const exclusions = useSelector(allExclusionsSelector);

  React.useEffect(() => {
    if (exclusions.length === 0) {
      dispatch(fetchExclusions());
    }
  }, [dispatch]);

  return {
    exclusions,
  };
};

export default useExclusions;
