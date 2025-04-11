import React, { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

const sampleStartupData = [
  { name: "GreenFinance", fundingGoal: "$500,000", raised: "$300,000", stage: "Seed", category: "CleanTech" },
  { name: "EduBank AI", fundingGoal: "$200,000", raised: "$190,000", stage: "Series A", category: "EdTech" }
];

const sampleInvestorData = [
  { name: "J Joshua Haniel", investedIn: ["GreenFinance"], totalInvestment: "$150,000", preferredCategory: "CleanTech" },
  { name: "Eklavya Singh", investedIn: ["EduBank AI"], totalInvestment: "$100,000", preferredCategory: "FinTech" },
  { name: "Aniket Kumar", investedIn: ["GreenFinance"], totalInvestment: "$100,000", preferredCategory: "GreenTech" },
  { name: "Rohan Sharma", investedIn: ["EduBank AI"], totalInvestment: "$200,000", preferredCategory: "EdTech" }
];

const users = {
  startups: Array.from({ length: 10 }, (_, i) => ({
    username: `startup${i + 1}`,
    password: "pass123"
  })),
  investors: [
    { username: "joshua", password: "Joshua@123" },
    { username: "eklavya", password: "Eklavya@123" },
    { username: "aniket", password: "Aniket@123" },
    { username: "rohan", password: "Rohan@123" }
  ]
};

const DashboardCard = ({ title, children }) => (
  <Card className="m-4 p-4 shadow-lg rounded-2xl">
    <CardContent>
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      {children}
    </CardContent>
  </Card>
);

const StartupDashboard = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {sampleStartupData.map((startup, index) => (
      <DashboardCard key={index} title={startup.name}>
        <p><strong>Funding Goal:</strong> {startup.fundingGoal}</p>
        <p><strong>Raised:</strong> {startup.raised}</p>
        <p><strong>Stage:</strong> {startup.stage}</p>
        <p><strong>Category:</strong> {startup.category}</p>
      </DashboardCard>
    ))}
  </div>
);

const InvestorDashboard = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {sampleInvestorData.map((investor, index) => (
      <DashboardCard key={index} title={investor.name}>
        <p><strong>Invested In:</strong> {investor.investedIn.join(", ")}</p>
        <p><strong>Total Investment:</strong> {investor.totalInvestment}</p>
        <p><strong>Preferred Category:</strong> {investor.preferredCategory}</p>
      </DashboardCard>
    ))}
  </div>
);

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const investor = users.investors.find(u => u.username === username && u.password === password);
    const startup = users.startups.find(u => u.username === username && u.password === password);
    if (investor) {
      onLogin("investor");
    } else if (startup) {
      onLogin("startup");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <Input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="mb-4" />
      <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="mb-4" />
      <Button onClick={handleLogin}>Login</Button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default function App() {
  const [role, setRole] = useState(null);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">FINTECH VAULT</h1>
      <p className="mb-8 text-lg">Empowering financial innovation through advanced technologies.</p>

      {!role ? (
        <Login onLogin={setRole} />
      ) : (
        <Tabs defaultValue={role}>
          <TabsList>
            {role === "startup" && <TabsTrigger value="startup">Startup Dashboard</TabsTrigger>}
            {role === "investor" && <TabsTrigger value="investor">Investor Dashboard</TabsTrigger>}
          </TabsList>
          <TabsContent value="startup">
            <StartupDashboard />
          </TabsContent>
          <TabsContent value="investor">
            <InvestorDashboard />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
