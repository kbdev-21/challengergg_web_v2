import {
  Badge,
  Box,
  Button,
  CircularProgress,
  Divider,
  GlobalStyles,
  Typography,
} from "@mui/material";
import { useState } from "react";
import MatchCard from "./MatchCard";
import LoadingCircular from "../ui/LoadingCircular";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchMatchHistoryByPuuid } from "../../services/leagueApi";

function MatchHistory({ povPuuid }) {
  const [selectingFilter, setSelectingFilter] = useState("all");
  const numOfMatches = 20;
  const filtersMap = {
    all: "All",
    solo: "Ranked Solo/Duo",
    flex: "Ranked Flex",
  };
  const {
    data: matches,
    isLoading,
    isError,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["matches", povPuuid, selectingFilter],
    queryFn: ({ pageParam = 0 }) =>
      fetchMatchHistoryByPuuid(
        povPuuid,
        selectingFilter,
        pageParam,
        numOfMatches
      ),
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length * numOfMatches;
    },
  });

  return (
    <>
      <Box
        sx={{
          paddingX: 0.6,
          paddingTop: 0.6,
          backgroundColor: "bg.main",
          borderRadius: 1,
          display: "flex",
        }}
      >
        <Box
          sx={{
            marginX: 0.5,
            padding: 1,
            cursor: "pointer",
            borderBottom: selectingFilter === "all" ? "2px solid" : "none",
            borderBottomColor:
              selectingFilter === "all" ? "main.main" : "bg.main",
          }}
          onClick={() => setSelectingFilter("all")}
        >
          <Typography
            sx={{
              fontWeight: selectingFilter === "all" ? 600 : 400,
              color: selectingFilter === "all" ? "main.main" : "content.main",
            }}
            variant="body2"
          >
            {filtersMap["all"]}
          </Typography>
        </Box>
        <Box
          sx={{
            marginX: 0.5,
            padding: 1,
            cursor: "pointer",
            borderBottom: selectingFilter === "solo" ? "2px solid" : "none",
            borderBottomColor:
              selectingFilter === "solo" ? "main.main" : "bg.main",
          }}
          onClick={() => setSelectingFilter("solo")}
        >
          <Typography
            sx={{
              fontWeight: selectingFilter === "solo" ? 600 : 400,
              color: selectingFilter === "solo" ? "main.main" : "content.main",
            }}
            variant="body2"
          >
            {filtersMap["solo"]}
          </Typography>
        </Box>
        <Box
          sx={{
            marginX: 0.5,
            padding: 1,
            cursor: "pointer",
            borderBottom: selectingFilter === "flex" ? "2px solid" : "none",
            borderBottomColor:
              selectingFilter === "flex" ? "main.main" : "bg.main",
          }}
          onClick={() => setSelectingFilter("flex")}
        >
          <Typography
            sx={{
              fontWeight: selectingFilter === "flex" ? 600 : 400,
              color: selectingFilter === "flex" ? "main.main" : "content.main",
            }}
            variant="body2"
          >
            {filtersMap["flex"]}
          </Typography>
        </Box>
      </Box>
      {isLoading ? (
        <LoadingCircular />
      ) : isError ? (
        <Typography>Error</Typography>
      ) : (
        <>
          <Box sx={{ marginTop: 1, borderRadius: 1 }}>
            {matches.pages.map((page, i) =>
              page.map((match, index) => (
                <Box key={`${i}-${index}`}>
                  <MatchCard matchData={match} povPuuid={povPuuid} />
                  <Box sx={{ height: 10 }} />
                </Box>
              ))
            )}
          </Box>
          <Box
            onClick={() => fetchNextPage()}
            sx={{
              width: 850,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "bg.main",
              paddingY: 1.5,
              borderRadius: 1,
              cursor: "pointer",
            }}
          >
            {isFetchingNextPage ? (
              <LoadingCircular isPage={false}></LoadingCircular>
            ) : (
              <Typography variant="subtitle2">Show more matches</Typography>
            )}
          </Box>
        </>
      )}
    </>
  );
}

export default MatchHistory;
