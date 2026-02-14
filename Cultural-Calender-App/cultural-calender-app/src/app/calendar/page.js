"use client";

import { useEffect, useMemo, useState } from "react";

const festivals = [
  {
    id: "new-year",
    month: 1,
    day: 1,
    name: "New Year's Day",
    region: "global",
    mood: "celebratory",
    tradition: "Family dinners, fireworks, and sharing intentions for the year ahead.",
    description:
      "A global turning point that marks fresh beginnings and communal celebration.",
    origin: "Roman calendar reforms and diverse local new-year traditions.",
    foods: ["Black-eyed peas", "Soba", "Grapes"],
    guidance:
      "Write one personal intention and one community intention before joining celebrations.",
    image:
      "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "pongal",
    month: 1,
    day: 14,
    name: "Pongal",
    region: "asia",
    mood: "harvest",
    tradition: "Thanksgiving to the Sun with kolam art, cattle worship, and shared meals.",
    description:
      "A Tamil harvest festival honoring nature, farmers, and abundance.",
    origin: "Ancient agrarian traditions of South India.",
    foods: ["Sakkarai Pongal", "Sugarcane", "Coconut chutney"],
    guidance:
      "Begin by learning one harvest song and cooking a sweet dish with local grains.",
    image:
      "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "holi",
    month: 3,
    day: 25,
    name: "Holi",
    region: "asia",
    mood: "celebratory",
    tradition: "Color play, music, and spring-themed gatherings.",
    description:
      "The festival of colors that celebrates renewal, love, and social unity.",
    origin: "Hindu spring traditions and stories of devotion.",
    foods: ["Gujiya", "Thandai", "Dahi vada"],
    guidance:
      "Use eco-friendly colors and invite someone from another background to join.",
    image:
      "https://images.unsplash.com/photo-1615825854364-f8f2f95c9c28?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "songkran",
    month: 4,
    day: 13,
    name: "Songkran",
    region: "asia",
    mood: "spiritual",
    tradition: "Water blessings, temple visits, and honoring elders.",
    description:
      "Traditional Thai new year focused on cleansing, gratitude, and good fortune.",
    origin: "Ancient solar calendar observances across Southeast Asia.",
    foods: ["Khao chae", "Mango sticky rice"],
    guidance:
      "Offer a respectful water blessing and learn local etiquette before public events.",
    image:
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "eid",
    month: 4,
    day: 21,
    name: "Eid al-Fitr",
    region: "global",
    mood: "spiritual",
    tradition: "Charity, communal prayer, and festive meals with neighbors.",
    description:
      "Celebrates gratitude and togetherness at the end of Ramadan.",
    origin: "Islamic lunar calendar tradition.",
    foods: ["Sheer khurma", "Biryani", "Dates"],
    guidance:
      "Support a local giving drive and join a community meal if invited.",
    image:
      "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "obon",
    month: 8,
    day: 13,
    name: "Obon",
    region: "asia",
    mood: "remembrance",
    tradition: "Lantern offerings and Bon Odori dances to honor ancestors.",
    description:
      "A Japanese period of remembrance and gratitude for those who came before us.",
    origin: "Buddhist-Confucian ancestral observances in Japan.",
    foods: ["Mochi", "Seasonal vegetables"],
    guidance:
      "Create a remembrance corner and record one family story for future generations.",
    image:
      "https://images.unsplash.com/photo-1569058242409-6f4df5f5e6b8?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "diwali",
    month: 11,
    day: 1,
    name: "Diwali",
    region: "asia",
    mood: "celebratory",
    tradition: "Lighting diyas, prayers, and exchanging sweets.",
    description:
      "Festival of lights symbolizing knowledge, hope, and victory over darkness.",
    origin: "Ancient Indian traditions shared across multiple faith communities.",
    foods: ["Laddu", "Barfi", "Chivda"],
    guidance:
      "Decorate with lamps and add a 'gratitude circle' to your gathering.",
    image:
      "https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "day-of-dead",
    month: 11,
    day: 2,
    name: "Day of the Dead",
    region: "americas",
    mood: "remembrance",
    tradition: "Ofrendas, marigolds, and stories celebrating departed loved ones.",
    description:
      "A vibrant Mexican celebration of memory, continuity, and family identity.",
    origin: "Mesoamerican and Catholic syncretic traditions.",
    foods: ["Pan de muerto", "Atole"],
    guidance:
      "Build a small altar with photos and a handwritten remembrance note.",
    image:
      "https://images.unsplash.com/photo-1575929118789-648a3f4a4f0f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "christmas",
    month: 12,
    day: 25,
    name: "Christmas",
    region: "global",
    mood: "celebratory",
    tradition: "Carol singing, gift-sharing, and family gatherings.",
    description:
      "A widely celebrated holiday centered on joy, giving, and reflection.",
    origin: "Christian liturgical traditions with global local adaptations.",
    foods: ["Roast dinner", "Plum cake", "Tamales"],
    guidance:
      "Pair gift exchange with a small community service activity.",
    image:
      "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?auto=format&fit=crop&w=1200&q=80",
  },
];

const regions = ["all", "asia", "americas", "europe", "global"];
const moods = ["all", "celebratory", "spiritual", "harvest", "remembrance"];

const getEventDate = (festival, year) => new Date(year, festival.month - 1, festival.day, 9);

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [regionFilter, setRegionFilter] = useState("all");
  const [moodFilter, setMoodFilter] = useState("all");
  const [activeFestival, setActiveFestival] = useState(null);
  const [countdown, setCountdown] = useState({ label: "", days: 0, hours: 0, minutes: 0, seconds: 0 });

  const filteredFestivals = useMemo(
    () =>
      festivals.filter((festival) => {
        const regionMatch = regionFilter === "all" || festival.region === regionFilter;
        const moodMatch = moodFilter === "all" || festival.mood === moodFilter;
        return regionMatch && moodMatch;
      }),
    [regionFilter, moodFilter],
  );

  const monthEvents = useMemo(() => {
    const month = currentDate.getMonth() + 1;
    return filteredFestivals
      .filter((festival) => festival.month === month)
      .sort((a, b) => a.day - b.day);
  }, [currentDate, filteredFestivals]);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const thisYear = now.getFullYear();
      const candidates = filteredFestivals
        .map((festival) => {
          const date = getEventDate(festival, thisYear);
          return date < now ? { festival, date: getEventDate(festival, thisYear + 1) } : { festival, date };
        })
        .sort((a, b) => a.date - b.date);

      if (!candidates.length) {
        setCountdown({ label: "No festival in this filter", days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const next = candidates[0];
      const diffMs = Math.max(next.date - now, 0);
      setCountdown({
        label: `${next.festival.name} (${next.date.toLocaleDateString(undefined, { month: "short", day: "numeric" })})`,
        days: Math.floor(diffMs / 86400000),
        hours: Math.floor((diffMs % 86400000) / 3600000),
        minutes: Math.floor((diffMs % 3600000) / 60000),
        seconds: Math.floor((diffMs % 60000) / 1000),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [filteredFestivals]);

  const monthYear = currentDate.toLocaleString("default", { month: "long", year: "numeric" });
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstWeekDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const dayCells = [];
  for (let i = 0; i < firstWeekDay; i += 1) {
    dayCells.push({ type: "empty", key: `empty-${i}` });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const foundFestival = filteredFestivals.find(
      (festival) => festival.month === currentDate.getMonth() + 1 && festival.day === day,
    );

    const today = new Date();
    const isToday =
      today.getFullYear() === currentDate.getFullYear() &&
      today.getMonth() === currentDate.getMonth() &&
      today.getDate() === day;

    dayCells.push({
      type: "day",
      key: `day-${day}`,
      day,
      festival: foundFestival,
      isToday,
    });
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="calendar-hero">
        <div className="text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Culture Explorer Calendar</h1>
          <p className="max-w-2xl mx-auto text-white/90 text-lg">
            Discover festivals, traditions, and guided ways to participate respectfully across global cultural timelines.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-8 py-10 grid gap-6">
        <article className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-3">Upcoming Festival Countdown</h2>
          <p className="text-slate-600 mb-4">{countdown.label}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            {[
              ["Days", countdown.days],
              ["Hours", countdown.hours],
              ["Minutes", countdown.minutes],
              ["Seconds", countdown.seconds],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl bg-indigo-50 p-4">
                <div className="text-3xl font-bold text-indigo-700">{value}</div>
                <div className="text-sm text-slate-600">{label}</div>
              </div>
            ))}
          </div>
        </article>

        <article className="bg-white rounded-2xl shadow p-6 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="text-sm font-medium">
              Region
              <select
                value={regionFilter}
                onChange={(event) => setRegionFilter(event.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 p-2"
              >
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region === "all" ? "All Regions" : region[0].toUpperCase() + region.slice(1)}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm font-medium">
              Theme
              <select
                value={moodFilter}
                onChange={(event) => setMoodFilter(event.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 p-2"
              >
                {moods.map((mood) => (
                  <option key={mood} value={mood}>
                    {mood === "all" ? "All Themes" : mood[0].toUpperCase() + mood.slice(1)}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex items-center gap-3 justify-end">
            <button
              type="button"
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
              className="rounded-lg border border-slate-300 px-3 py-2 hover:bg-slate-100"
            >
              ◀
            </button>
            <h3 className="min-w-44 text-center font-semibold">{monthYear}</h3>
            <button
              type="button"
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
              className="rounded-lg border border-slate-300 px-3 py-2 hover:bg-slate-100"
            >
              ▶
            </button>
          </div>
        </article>

        <article className="bg-white rounded-2xl shadow p-6">
          <div className="grid grid-cols-7 gap-2 text-center text-xs md:text-sm font-semibold text-slate-500 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((weekday) => (
              <div key={weekday}>{weekday}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {dayCells.map((cell) => (
              <button
                key={cell.key}
                type="button"
                disabled={cell.type === "empty" || !cell.festival}
                onClick={() => cell.festival && setActiveFestival(cell.festival)}
                className={[
                  "min-h-[82px] rounded-lg p-2 text-left border",
                  cell.type === "empty" ? "border-transparent bg-transparent" : "border-slate-200",
                  cell.isToday ? "ring-2 ring-indigo-500" : "",
                  cell.festival ? "bg-amber-50 hover:border-amber-400 cursor-pointer" : "bg-white",
                  !cell.festival ? "cursor-default" : "",
                ].join(" ")}
              >
                {cell.type === "day" && (
                  <>
                    <div className="text-sm font-semibold">{cell.day}</div>
                    {cell.festival && <p className="mt-1 text-xs text-amber-700 font-medium">{cell.festival.name}</p>}
                  </>
                )}
              </button>
            ))}
          </div>
        </article>

        <article className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Monthly Cultural Guide</h2>
          {monthEvents.length === 0 ? (
            <p className="text-slate-600">No festival matched this month. Try another month or broaden filters.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {monthEvents.map((festival) => (
                <div key={festival.id} className="rounded-xl border border-slate-200 p-4">
                  <div className="flex justify-between gap-4 mb-2">
                    <h3 className="font-semibold">{festival.name}</h3>
                    <span className="text-sm text-slate-500">
                      {new Date(currentDate.getFullYear(), festival.month - 1, festival.day).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{festival.description}</p>
                  <p className="text-sm text-indigo-700"><strong>Try this:</strong> {festival.guidance}</p>
                </div>
              ))}
            </div>
          )}
        </article>
      </section>

      {activeFestival && (
        <div className="fixed inset-0 bg-black/70 p-4 md:p-8 z-50 overflow-y-auto" onClick={() => setActiveFestival(null)}>
          <div
            className="max-w-3xl mx-auto bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <img src={activeFestival.image} alt={activeFestival.name} className="h-64 w-full object-cover" />
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">{activeFestival.name}</h2>
                  <p className="text-sm text-slate-500 capitalize">
                    {activeFestival.region} • {activeFestival.mood}
                  </p>
                </div>
                <button type="button" onClick={() => setActiveFestival(null)} className="text-2xl leading-none">
                  ×
                </button>
              </div>
              <p className="mt-4 text-slate-700">{activeFestival.description}</p>
              <div className="grid md:grid-cols-2 gap-4 mt-5 text-sm">
                <div>
                  <h3 className="font-semibold mb-1">Tradition</h3>
                  <p className="text-slate-600">{activeFestival.tradition}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Origins</h3>
                  <p className="text-slate-600">{activeFestival.origin}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Festival Foods</h3>
                  <p className="text-slate-600">{activeFestival.foods.join(", ")}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Guided Participation</h3>
                  <p className="text-slate-600">{activeFestival.guidance}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
