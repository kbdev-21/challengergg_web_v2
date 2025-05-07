import { Box, Typography } from "@mui/material";
import {
  getItemImageUrl,
  getRuneImageUrl,
  getSpellImageUrl,
} from "../../services/ddragonApi";

function ChampBuild({ champ, currentPatch }) {
  //const mainStyle = champ?.mostRune.primaryStyle;
  //const subStyle = champ?.mostRune.subStyle;
  const mainRunes = champ?.mostRune.primarySelections;
  const subRunes = champ?.mostRune.subSelections;
  const spell1 = champ?.mostSpellCombo[0];
  const spell2 = champ?.mostSpellCombo[1];
  const items = champ?.mostItems;
  const boot = champ?.mostBoots[0];

  return (
    <Box
      sx={{
        marginX: "25%",
        backgroundColor: "bg.main",
        borderRadius: 1,
        border: "1px solid",
        borderColor: "content.light2",
        padding: 1,
      }}
    >
      <Typography variant="subtitle2">Recommend Build</Typography>
      <Box height={10}></Box>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              padding: 1,
              border: "1px solid",
              borderColor: "content.light2",
              borderRadius: 2,
            }}
          >
            <Typography variant="subtitle2" >Best runes</Typography>
            <Box height={5}></Box>
            <Box
              sx={{
                display: "flex",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {mainRunes.map((rune, index) => (
                  <Box
                    sx={{
                      height: 40,
                      width: 40,
                      borderRadius: "50%",
                      backgroundColor: "black",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 1
                    }}
                  >
                    <Box
                      id={index}
                      component="img"
                      src={getRuneImageUrl(rune)}
                      alt=""
                      sx={{
                        height: 36,
                        width: 36,
                      }}
                    />
                  </Box>
                ))}
              </Box>
              <Box width={6}></Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {subRunes.map((rune, index) => (
                  <Box
                  sx={{
                    height: 40,
                    width: 40,
                    borderRadius: "50%",
                    backgroundColor: "black",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 1
                  }}
                >
                  <Box
                    id={index}
                    component="img"
                    src={getRuneImageUrl(rune)}
                    alt=""
                    sx={{
                      height: 36,
                      width: 36,
                    }}
                  />
                </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box width={10}></Box>
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              padding: 1,
              border: "1px solid",
              borderColor: "content.light2",
              borderRadius: 2,
              height: "fit-content",
            }}
          >
            <Typography variant="subtitle2">Most common items</Typography>
            <Box height={5}></Box>

            <Box sx={{ display: "flex" }}>
              {boot ? (
                <Box
                  component="img"
                  src={getItemImageUrl(boot, currentPatch)}
                  alt=""
                  sx={{
                    height: 40,
                    width: 40,
                    marginRight: 1,
                    borderRadius: 1
                  }}
                />
              ) : null}

              {items.slice(0, 3).map((item, index) => (
                <Box
                  id={index}
                  component="img"
                  src={getItemImageUrl(item, currentPatch)}
                  alt=""
                  sx={{
                    height: 40,
                    width: 40,
                    marginRight: 1,
                    borderRadius: 1
                  }}
                />
              ))}
            </Box>
          </Box>

          <Box width={10}></Box>

          <Box
            sx={{
              padding: 1,
              border: "1px solid",
              borderColor: "content.light2",
              borderRadius: 2,
              height: "fit-content",
            }}
          >
            <Typography variant="subtitle2">Summoner spells</Typography>
            <Box height={5}></Box>
            <Box sx={{ display: "flex" }}>
              <Box
                component="img"
                src={getSpellImageUrl(spell1, currentPatch)}
                alt=""
                sx={{
                  height: 40,
                  width: 40,
                  borderRadius: 1
                }}
              />
              <Box width={8}></Box>
              <Box
                component="img"
                src={getSpellImageUrl(spell2, currentPatch)}
                alt=""
                sx={{
                  height: 40,
                  width: 40,
                  borderRadius: 1
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ChampBuild;
