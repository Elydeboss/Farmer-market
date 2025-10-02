import React from "react";

const Dashboard: React.FC = () => {
  const orders = [
    {
      id: 1,
      name: "Adekunle Joshua",
      avatar: "https://i.pravatar.cc/40?img=2",
      location: "Lagos, Nigeria",
      distance: "2km away",
      time: "2 mins ago",
      status: "Pending",
      items: [
        { name: "Tomatoes", price: 2000 },
        { name: "Yam Tuber", price: 5000 },
      ],
    },
    {
      id: 2,
      name: "Blessing Uche",
      avatar: "https://i.pravatar.cc/40?img=4",
      location: "Abuja, Nigeria",
      distance: "4km away",
      time: "5 mins ago",
      status: "Accepted",
      items: [
        { name: "Cassava", price: 1500 },
        { name: "Maize", price: 3500 },
      ],
    },
    {
      id: 3,
      name: "Oluwaseun Ade",
      avatar: "https://i.pravatar.cc/40?img=5",
      location: "Ibadan, Nigeria",
      distance: "3km away",
      time: "8 mins ago",
      status: "Rejected",
      items: [
        { name: "Rice", price: 10000 },
        { name: "Beans", price: 2500 },
      ],
    },
  ];

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 h-screen sticky top-0 left-0 bg-white border-r border-gray-100 p-6 flex-col justify-between">
        <div>
          <div className="mb-6 flex items-center gap-2">
            <div className="w-9 h-9 rounded-md bg-green-500 flex items-center justify-center text-white shadow-sm">
              🛒
            </div>
            <div className="text-sm font-semibold">FarmMarket</div>
          </div>

          <nav className="text-sm text-gray-500">
            <div className="mb-6">
              <div className="text-xs font-semibold text-gray-400 mb-2">
                Main
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-3 text-gray-700 font-medium">
                  <span>🏠</span>
                  <span>Dashboard</span>
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <span>🛍️</span>
                  <span>Marketplace</span>
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <div className="text-xs font-semibold text-gray-400 mb-2">
                Transaction
              </div>
              <ul className="space-y-1">
                <li className="flex items-center gap-3 text-gray-600 py-1">
                  📦 Order Management
                </li>
                <li className="flex items-center gap-3 text-gray-600 py-1">
                  📨 Buyers Request
                </li>
                <li className="flex items-center gap-3 text-gray-600 py-1">
                  🚚 Deliveries
                </li>
                <li className="flex items-center gap-3 text-gray-600 py-1">
                  🔎 Track Order
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div>
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/40?img=3"
              alt="me"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="text-sm font-semibold">John Caleb Ekong</div>
              <div className="text-xs text-gray-400">Farmer</div>
            </div>
          </div>
          <button className="mt-4 text-sm text-red-500">Logout</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <div className="text-sm text-gray-400 mt-1">Welcome Caleb</div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-2 rounded-full hover:bg-gray-100">🔔</div>
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src="https://i.pravatar.cc/40?img=7"
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* Stats */}
        <section className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-1 rounded-2xl p-6 shadow-sm bg-white">
            <div className="text-xs text-gray-500">Total Sales</div>
            <div className="mt-3 text-2xl font-semibold text-gray-800">
              ₦50,000
            </div>
            <div className="mt-2 text-xs text-gray-400">This week</div>
          </div>
          <div className="flex-1 rounded-2xl p-6 shadow-sm bg-white">
            <div className="text-xs text-gray-500">New Orders</div>
            <div className="mt-3 text-2xl font-semibold text-gray-800">120</div>
            <div className="mt-2 text-xs text-gray-400">
              Pending confirmation
            </div>
          </div>
          <div className="flex-1 rounded-2xl p-6 shadow-sm bg-white">
            <div className="text-xs text-gray-500">Customers</div>
            <div className="mt-3 text-2xl font-semibold text-gray-800">
              1,024
            </div>
            <div className="mt-2 text-xs text-gray-400">Active this month</div>
          </div>
        </section>

        {/* Orders */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Orders
          </h2>

          <div className="flex flex-wrap gap-6">
            {orders.map((order) => (
              <article
                key={order.id}
                className="bg-white rounded-2xl shadow-sm p-6 flex-1 min-w-[280px] max-w-[360px] flex-shrink"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={order.avatar}
                    alt={order.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-semibold text-gray-800">
                          {order.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          {order.location} · {order.distance}
                        </div>
                      </div>
                      <div className="text-sm text-right">
                        <div
                          className={`text-xs px-3 py-1 rounded-full font-medium ${
                            order.status === "Accepted"
                              ? "bg-green-100 text-green-700"
                              : order.status === "Rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-indigo-100 text-indigo-700"
                          }`}
                        >
                          {order.status}
                        </div>
                        <div className="text-xs text-gray-400 mt-2">
                          {order.time}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 text-xs text-gray-500">
                      Requested Item:
                    </div>
                    <div className="mt-2 text-sm text-gray-700">
                      {order.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between py-1">
                          <div>{it.name}</div>
                          <div className="font-medium">
                            {formatCurrency(it.price)}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button className="px-3 py-2 rounded-lg border border-green-200 bg-green-50 text-green-700 text-sm">
                          Accept
                        </button>
                        <button className="px-3 py-2 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm">
                          Reject
                        </button>
                      </div>
                      <div className="text-sm text-gray-500">View details</div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
