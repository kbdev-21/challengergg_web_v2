import TopLogo from "../../assets/TOP.png";
import JglLogo from "../../assets/JGL.png";
import MidLogo from "../../assets/MID.png";
import AdcLogo from "../../assets/ADC.png";
import SptLogo from "../../assets/SPT.png";
import TopLogoYellow from "../../assets/TOP_yellow.png";
import JglLogoYellow from "../../assets/JGL_yellow.png";
import MidLogoYellow from "../../assets/MID_yellow.png";
import AdcLogoYellow from "../../assets/ADC_yellow.png";
import SptLogoYellow from "../../assets/SPT_yellow.png";

export function PositionLogo({ position, height = "16px", colorMode = 1 }) {
    const positionLogos = {
        TOP: TopLogo,
        JGL: JglLogo,
        MID: MidLogo,
        ADC: AdcLogo,
        SPT: SptLogo,
    };

    const positionYellowLogos = {
        TOP: TopLogoYellow,
        JGL: JglLogoYellow,
        MID: MidLogoYellow,
        ADC: AdcLogoYellow,
        SPT: SptLogoYellow,
    };

    return (
        <img
            src={colorMode === 2 ? positionYellowLogos[position] : positionLogos[position]}
            style={{
                height,
                opacity: colorMode === 0 ? 0.4 : 1, // make faded by lowering opacity
                filter: colorMode === 0 ? "grayscale(60%)" : "none", // optional: make it more "dim"
            }}
            alt={`${position} Logo`}
        />
    );
}
