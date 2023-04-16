import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { signOut, getAccessToken } from "supertokens-auth-react/recipe/session";
import { recipeDetails } from "../config";
import CallAPIView from "./CallAPIView";
import { BlogsIcon, CelebrateIcon, GuideIcon, SeparatorLine, SignOutIcon } from "../assets/images";

interface ILink {
    name: string;
    onClick: () => void;
    icon: string;
}

export default function SuccessView(props: { userId: string }) {
    let userId = props.userId;
    const [ accessToken, setAccessToken ] = useState<string | undefined>( undefined );

    useEffect( () => {
        getToken().then();
    }, [] );

    const navigate = useNavigate();

    async function logoutClicked() {
        await signOut();
        navigate("/auth");
    }

    function openLink(url: string) {
        window.open(url, "_blank");
    }

    async function getToken(): Promise<void> {
        const accessToken = await getAccessToken();
        console.log({accessToken})
        setAccessToken(accessToken);
    }

    const links: ILink[] = [
        {
            name: "Blogs",
            onClick: () => openLink("https://supertokens.com/blog"),
            icon: BlogsIcon,
        },
        {
            name: "Documentation",
            onClick: () => openLink(recipeDetails.docsLink),
            icon: GuideIcon,
        },
        {
            name: "Sign Out",
            onClick: logoutClicked,
            icon: SignOutIcon,
        },
    ];

    return (
        <>
            <div className="main-container">
                <div className="top-band success-title bold-500">
                    <img src={CelebrateIcon} alt="Login successful" className="success-icon" /> Login successful
                </div>
                <div className="inner-content">
                    <div>Your userID is:</div>
                    <div className="truncate" id="user-id">
                        {userId}
                    </div>
                    <CallAPIView />
                </div>
                <div className="inner-content">
                    <div>Your access token:</div>
                    <div className="truncate" id="access-token">
                        {accessToken}
                    </div>
                </div>
            </div>
            <div className="bottom-links-container">
                {links.map((link) => (
                    <div className="link" key={link.name}>
                        <img className="link-icon" src={link.icon} alt={link.name} />
                        <div role={"button"} onClick={link.onClick}>
                            {link.name}
                        </div>
                    </div>
                ))}
            </div>
            <img className="separator-line" src={SeparatorLine} alt="separator" />
        </>
    );
}
