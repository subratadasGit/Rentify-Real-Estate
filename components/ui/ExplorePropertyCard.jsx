"use client";

import React from "react";
import styled from "styled-components";
import ListingMapView from "@/app/_components/ListingMapView";

const Card = () => {
  return (
    <StyledWrapper>
      <div className="glow-card">
        <ListingMapView type="Sell" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .glow-card {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 1rem;
    border-radius: 1.5rem;
    background: linear-gradient(135deg, #2a2a33 10%, #101010 60%);
    background-size: 200% 200%;
    animation: gradient-shift 5s ease-in-out infinite;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: visible;
  }

  .glow-card::before,
.glow-card::after {
  --size: 5px;
  content: "";
  position: absolute;
  top: calc(var(--size) / -2);
  left: calc(var(--size) / -2);
  width: calc(100% + var(--size));
  height: calc(100% + var(--size));
  background: radial-gradient(circle at 0 0, #c084fc, transparent),
    radial-gradient(circle at 100% 0, #f0abfc, transparent),
    radial-gradient(circle at 0 100%, #a78bfa, transparent),
    radial-gradient(circle at 100% 100%, #9333ea, transparent);
}



  .glow-card::after {
    --size: 2px;
    z-index: -1;
  }

  .glow-card::before {
    --size: 10px;
    z-index: -2;
    filter: blur(2vmin);
    animation: blur-animation 3s ease-in-out alternate infinite;
  }

  @keyframes blur-animation {
    to {
      filter: blur(3vmin);
      transform: scale(1.05);
    }
  }

  @keyframes gradient-shift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

export default Card;
