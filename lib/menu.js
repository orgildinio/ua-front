'use client'
import fetcher from "fetcher";
import Link from "next/link";
import base from "./base";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";

export const revalidate = 60;
