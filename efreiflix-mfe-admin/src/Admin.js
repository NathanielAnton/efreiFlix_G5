import React, { useState, useEffect } from "react";
import { User, Shield, Users, ChevronRight } from "lucide-react";
import "./styles.css";
import PersonalInfoSection from "./components/personalInfoSection";
import ProfileManagementSection from "./components/ProfileManagementSection";

const Admin = () => {
  const [activeSection, setActiveSection] = useState("personal");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:2066/users/1");
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const sidebarItems = [
    { id: "personal", label: "Informations personnelles", icon: User },
    { id: "profiles", label: "Gestion des profils", icon: Users },
  ];

  const handleUpdatePersonalInfo = async (updatedData) => {
    try {
      const response = await fetch(`http://localhost:2066/users/${userData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to update user information');
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
    } catch (error) {
      console.error('Error updating user information:', error);
    }
  };

  const handleUpdateUserData = async (updatedUserData) => {
    try {
      const response = await fetch(`http://localhost:2066/users/${userData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserData),
      });

      if (!response.ok) {
        throw new Error('Failed to update user data');
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
      return updatedUser;
    } catch (error) {
      console.error('Error updating user data:', error);
      throw error;
    }
  };

  const renderSection = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-netflixRed"></div>
        </div>
      );
    }

    if (!userData) {
      return (
        <div className="flex items-center justify-center h-64 text-gray-500">
          Error loading user data
        </div>
      );
    }

    switch (activeSection) {
      case "personal":
        return <PersonalInfoSection user={userData} onUpdatePersonalInfo={handleUpdatePersonalInfo} />;
      case "profiles":
        return <ProfileManagementSection user={userData} onUpdateUserData={handleUpdateUserData} />;
      default:
        return (
          <div className="flex items-center justify-center h-64 text-gray-500">
            Section en cours de développement
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin MFE</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-6">

          <div className="w-full md:w-64 shrink-0">
            <nav className="bg-gray-50 rounded-lg">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center justify-between p-3 text-left hover:bg-gray-100 rounded-lg transition-colors ${
                      activeSection === item.id
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="flex-1">
            <div className="bg-gray-50 rounded-lg p-6">{renderSection()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;