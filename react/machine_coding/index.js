/*  Tabs Component


        export default function App() {

            const tabsData = [
                { label: "Home", content: "Welcome to Home" },
                { label: "About", content: "About us page" },
                { label: "Contact", content: "Contact us here" },
            ];

            return (
                <div>
                    <Tabs tabs={tabsData} />
                </div>
            );
        }


        export default function Tabs({ tabs }) {

            const [activeIndex, setActiveIndex] = useState(0);

            return (
                <div className="tab-container">
                    <div className="tab-headers">
                        {tabs.map((tab, i) => (
                        <button key={i} onClick={() => setActiveIndex(i)}>
                            {tab.label}
                        </button>
                        ))}
                    </div>
                    <div className="tab-content">{tabs[activeIndex].content}</div>
                </div>
            );
        }


*/