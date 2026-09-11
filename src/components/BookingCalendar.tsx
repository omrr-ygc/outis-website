"use client";

import { useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, Clock, Video, CheckCircle, AlertCircle } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useI18n } from "@/lib/i18n";

const AVAILABLE_HOURS = [
  "10:00", "10:30", "11:00", "11:30",
  "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30",
];

const DAY_NAMES_EN = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DAY_NAMES_TR = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

const MONTH_NAMES_EN = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const MONTH_NAMES_TR = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

function isWeekday(year: number, month: number, day: number) {
  const d = new Date(year, month, day).getDay();
  return d !== 0 && d !== 6;
}

function isToday(year: number, month: number, day: number) {
  const now = new Date();
  return now.getFullYear() === year && now.getMonth() === month && now.getDate() === day;
}

function isFutureOrToday(year: number, month: number, day: number) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const date = new Date(year, month, day);
  return date >= now;
}

export default function BookingCalendar() {
  const now = new Date();
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [step, setStep] = useState<"calendar" | "form" | "success">("calendar");
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { locale, t } = useI18n();

  const dayNames = locale === "tr" ? DAY_NAMES_TR : DAY_NAMES_EN;
  const monthNames = locale === "tr" ? MONTH_NAMES_TR : MONTH_NAMES_EN;

  useEffect(() => {
    fetch("/api/booking")
      .then((r) => r.json())
      .then((data) => {
        if (data.bookedSlots) setBookedSlots(data.bookedSlots);
      })
      .catch(() => {});
  }, []);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfWeek = getFirstDayOfWeek(currentYear, currentMonth);

  const availableTimesForDate = useMemo(() => {
    if (!selectedDate) return [];
    const [year, month, day] = selectedDate.split("-").map(Number);
    const todayCheck = isToday(year, month - 1, day);

    return AVAILABLE_HOURS.filter((time) => {
      if (bookedSlots.includes(`${selectedDate}T${time}`)) return false;
      if (todayCheck) {
        const now = new Date();
        const [h, m] = time.split(":").map(Number);
        const slotMinutes = h * 60 + m;
        const nowMinutes = now.getHours() * 60 + now.getMinutes();
        if (slotMinutes <= nowMinutes) return false;
      }
      return true;
    });
  }, [selectedDate, bookedSlots]);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateClick = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setSelectedDate(dateStr);
    setSelectedTime(null);
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
    setStep("form");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const name = form.name.trim();
    const email = form.email.trim();

    if (!name || !email) {
      setError(t.booking.errorNameEmail[locale]);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(t.booking.errorEmail[locale]);
      return;
    }

    if (!selectedDate || !selectedTime) {
      setError(t.booking.errorDateTime[locale]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company: form.company.trim(),
          message: form.message.trim(),
          date: selectedDate,
          time: selectedTime,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || t.booking.errorGeneric[locale]);
        return;
      }

      setBookedSlots((prev) => [...prev, `${selectedDate}T${selectedTime}`]);
      setStep("success");
    } catch {
      setError(t.booking.errorGenericLong[locale]);
    } finally {
      setLoading(false);
    }
  };

  const isPastMonth =
    currentYear < now.getFullYear() ||
    (currentYear === now.getFullYear() && currentMonth < now.getMonth());

  return (
    <section id="booking" className="py-24 md:py-32 border-t border-gold/10 bg-burgundy-deep">
      <div className="mx-auto max-w-4xl px-6">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-gold/15 rounded-full text-xs text-gold/70 font-mono tracking-wider mb-6">
              {t.booking.badge[locale]}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-gold-light">
              {t.booking.title[locale]}
            </h2>
            <p className="text-gold-light/50 text-lg mb-2 max-w-lg mx-auto">
              {t.booking.subtitle[locale]}
            </p>
            <div className="flex items-center justify-center gap-4 mt-4 text-gold-light/40 text-sm">
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {t.booking.duration[locale]}
              </span>
              <span className="flex items-center gap-1.5">
                <Video size={14} />
                {t.booking.videoCall[locale]}
              </span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className="border border-gold/15 rounded-xl bg-surface overflow-hidden">
            {step === "success" ? (
              <div className="p-10 md:p-14 text-center">
                <CheckCircle size={48} className="text-gold mx-auto mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-bold text-gold-light mb-2">{t.booking.successTitle[locale]}</h3>
                <p className="text-gold-light/50 text-sm mb-1">
                  {selectedDate} at {selectedTime}
                </p>
                <p className="text-gold-light/40 text-sm">
                  {t.booking.successSubtitle[locale]}
                </p>
              </div>
            ) : step === "form" ? (
              <div className="p-6 md:p-10">
                <button
                  onClick={() => setStep("calendar")}
                  className="text-sm text-gold/60 hover:text-gold mb-6 flex items-center gap-1"
                >
                  <ChevronLeft size={14} />
                  {t.booking.backToCalendar[locale]}
                </button>

                <div className="mb-6 p-4 bg-surface-light rounded-lg border border-gold/10">
                  <p className="text-sm text-gold-light/60">
                    <span className="text-gold font-medium">{selectedDate}</span> at{" "}
                    <span className="text-gold font-medium">{selectedTime}</span>
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                  {error && (
                    <div className="flex items-center gap-2 mb-6 p-3 bg-red-950/40 border border-red-500/20 rounded-lg text-red-300 text-sm" role="alert">
                      <AlertCircle size={16} className="shrink-0" />
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label htmlFor="book-name" className="block text-xs font-mono text-gold/60 tracking-wider mb-2">
                        {t.booking.formName[locale]} *
                      </label>
                      <input
                        id="book-name"
                        type="text"
                        required
                        maxLength={100}
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder={t.booking.formNamePlaceholder[locale]}
                        autoComplete="name"
                        className="w-full px-4 py-3 bg-surface-light border border-gold/10 rounded-lg text-gold-light text-sm placeholder:text-gold-light/20 focus:outline-none focus:border-gold/30 focus:ring-1 focus:ring-gold/20 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="book-email" className="block text-xs font-mono text-gold/60 tracking-wider mb-2">
                        {t.booking.formEmail[locale]} *
                      </label>
                      <input
                        id="book-email"
                        type="email"
                        required
                        maxLength={254}
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder={t.booking.formEmailPlaceholder[locale]}
                        autoComplete="email"
                        className="w-full px-4 py-3 bg-surface-light border border-gold/10 rounded-lg text-gold-light text-sm placeholder:text-gold-light/20 focus:outline-none focus:border-gold/30 focus:ring-1 focus:ring-gold/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label htmlFor="book-company" className="block text-xs font-mono text-gold/60 tracking-wider mb-2">
                      {t.booking.formCompany[locale]}
                    </label>
                    <input
                      id="book-company"
                      type="text"
                      maxLength={100}
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder={t.booking.formCompanyPlaceholder[locale]}
                      className="w-full px-4 py-3 bg-surface-light border border-gold/10 rounded-lg text-gold-light text-sm placeholder:text-gold-light/20 focus:outline-none focus:border-gold/30 focus:ring-1 focus:ring-gold/20 transition-all"
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="book-message" className="block text-xs font-mono text-gold/60 tracking-wider mb-2">
                      {t.booking.formMessage[locale]}
                    </label>
                    <textarea
                      id="book-message"
                      rows={3}
                      maxLength={500}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder={t.booking.formMessagePlaceholder[locale]}
                      className="w-full px-4 py-3 bg-surface-light border border-gold/10 rounded-lg text-gold-light text-sm placeholder:text-gold-light/20 focus:outline-none focus:border-gold/30 focus:ring-1 focus:ring-gold/20 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gold text-burgundy-deep font-medium text-sm rounded-lg hover:bg-gold-light transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-burgundy-deep/30 border-t-burgundy-deep rounded-full animate-spin" />
                    ) : (
                      t.booking.submitButton[locale]
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <div className="p-6 md:p-10">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-6">
                      <button
                        onClick={prevMonth}
                        disabled={isPastMonth}
                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gold/15 text-gold-light/50 hover:text-gold-light hover:border-gold/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <h3 className="text-sm font-medium text-gold-light">
                        {monthNames[currentMonth]} {currentYear}
                      </h3>
                      <button
                        onClick={nextMonth}
                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gold/15 text-gold-light/50 hover:text-gold-light hover:border-gold/30 transition-colors"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>

                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {dayNames.map((d) => (
                        <div key={d} className="text-center text-[10px] text-gold-light/30 font-mono py-1">
                          {d}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                      {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                        <div key={`empty-${i}`} />
                      ))}
                      {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1;
                        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                        const available = isWeekday(currentYear, currentMonth, day) && isFutureOrToday(currentYear, currentMonth, day);
                        const isSelected = selectedDate === dateStr;
                        const today = isToday(currentYear, currentMonth, day);

                        return (
                          <button
                            key={day}
                            disabled={!available}
                            onClick={() => handleDateClick(day)}
                            className={`aspect-square flex items-center justify-center rounded-lg text-sm transition-all duration-150 relative ${
                              isSelected
                                ? "bg-gold text-burgundy-deep font-bold"
                                : available
                                ? "text-gold-light/70 hover:bg-gold/10 hover:text-gold-light"
                                : "text-gold-light/15 cursor-not-allowed"
                            }`}
                          >
                            {day}
                            {today && !isSelected && (
                              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-gold rounded-full" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="md:w-48 md:border-l md:border-gold/10 md:pl-8">
                    <h4 className="text-xs font-mono text-gold/60 tracking-wider mb-4">
                      {selectedDate ? t.booking.selectTime[locale] : t.booking.selectDate[locale]}
                    </h4>
                    {selectedDate ? (
                      <div className="flex flex-row md:flex-col flex-wrap gap-2">
                        {availableTimesForDate.length > 0 ? (
                          availableTimesForDate.map((time) => (
                            <button
                              key={time}
                              onClick={() => handleTimeClick(time)}
                              className={`px-4 py-2 text-sm rounded-lg border transition-all duration-150 ${
                                selectedTime === time
                                  ? "bg-gold text-burgundy-deep border-gold font-medium"
                                  : "text-gold-light/60 border-gold/15 hover:border-gold/30 hover:text-gold-light"
                              }`}
                            >
                              {time}
                            </button>
                          ))
                        ) : (
                          <p className="text-xs text-gold-light/30">{t.booking.noSlots[locale]}</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-xs text-gold-light/30">{t.booking.selectDateHint[locale]}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
