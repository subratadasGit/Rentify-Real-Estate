"use client";
import React from "react";
import ProfileCard from "@/react-bits/ProfileCard/ProfileCard";

const teamMembers = [
  {
    name: "Subrata Das",
    title: "Lead Project Developer",
    avatarUrl: "/profile-1.jpg",
    miniAvatarUrl: "/profile-1.jpg",
    iconUrl: "/profile-1.jpg",
    handle: "subratacodes",
    status: "Online",
  },
  {
    name: "Suvra Bhattacharya",
    title: "UX Designer",
    avatarUrl: "/cartoon-robot-2.webp",
    miniAvatarUrl: "/cartoon-robot-2.webp",
    iconUrl: "/cartoon-robot-2.webp",
    handle: "suvra_ui",
    status: "Offline",
  },
  {
    name: "Udar Das",
    title: "Backend Engineer",
    avatarUrl: "/Rhys Larsen.png",
    miniAvatarUrl: "/Rhys Larsen.png",
    iconUrl: "/Rhys Larsen.png",
    handle: "udar_dev",
    status: "Busy",
  },
  // {
  //   name: "Sayani Basu",
  //   title: "UI Designer",
  //   avatarUrl: "/profile-4.jpg",
  //   miniAvatarUrl: "/profile-4.jpg",
  //   iconUrl: "/profile-4.jpg",
  //   handle: "sayani_s",
  //   status: "Available",
  // },
];

const TeamSection = () => {
  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-purple-500 mb-4">Our Team</h2>
        <p className="text-lg text-purple-400">Meet the team behind Rentify.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
        {teamMembers.map((member, index) => (
          <ProfileCard
            key={index}
            avatarUrl={member.avatarUrl}
            miniAvatarUrl={member.miniAvatarUrl}
            iconUrl={member.iconUrl}
            name={member.name}
            title={member.title}
            handle={member.handle}
            status={member.status}
            onContactClick={() => alert(`Contacting ${member.name}`)}
          />
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
