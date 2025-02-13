import React from "react";
import { FaDiscord } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";
import { RiInstagramFill } from "react-icons/ri";
import { BsLinkedin } from "react-icons/bs";
import { FaPatreon } from "react-icons/fa6";
import { FaPaypal } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa";
import { FaRedditAlien } from "react-icons/fa";
import { FaSteam } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaTwitch } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io5";
import { FaLink } from "react-icons/fa6";

export const SocialIcons = (label: string) => {
  switch (label.toLowerCase()) {
    case "discord":
      return <FaDiscord />;
    case "github":
      return <BsGithub />;
    case "instagram":
      return <RiInstagramFill />;
    case "linkedin":
      return <BsLinkedin />;
    case "patreon":
      return <FaPatreon />;
    case "paypal":
      return <FaPaypal />;
    case "producthunt":
      return <FaProductHunt />;
    case "reddit":
      return <FaRedditAlien />;
    case "steam":
      return <FaSteam />;
    case "tiktok":
      return <FaTiktok />;
    case "twitch":
      return <FaTwitch />;
    case "twitter":
      return <FaXTwitter />;
    case "youtube":
      return <IoLogoYoutube />;
    default:
      return <FaLink />;
  }
};
