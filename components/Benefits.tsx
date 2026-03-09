import { Award, FileText, Briefcase, Sparkles } from "lucide-react";
import { BENEFITS, BENEFITS_PREMIUM } from "@/constants/marketing";

export default function Benefits() {
    return (
        <section className="w-full py-24">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-16 flex flex-col items-center">
                    <span className="px-4 py-1.5 border rounded-full text-sm font-medium text-slate-500 shadow-sm bg-white border-slate-200">Benefits</span>
                    <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mt-6 leading-tight text-slate-900 font-display">
                        Built to Get You <span className="inline-flex items-center gap-1 text-[#1F8A77]"><Award strokeWidth={2} className="w-8 h-8 fill-[#1F8A77]/20" /> Hired</span>
                    </h2>
                    <p className="text-lg text-slate-500 mt-6 max-w-2xl text-center">Solve the most common career hurdles with JobStory's automated tools.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col gap-6">
                        <div className="rounded-3xl p-8 border shadow-sm flex flex-col flex-1 bg-white border-slate-200">
                            <div className="h-48 w-full rounded-2xl border mb-6 flex items-center justify-center relative overflow-hidden bg-slate-50 border-slate-100">
                                <div className="absolute w-32 h-32 border rounded-full flex items-center justify-center border-slate-200">
                                    <div className="w-20 h-20 border rounded-full flex items-center justify-center shadow-sm z-10 border-slate-200 bg-white">
                                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white bg-[#1F8A77]">
                                            <FileText strokeWidth={2} className="w-6 h-6" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-xl font-medium tracking-tight text-slate-900">{BENEFITS[0].title}</h3>
                            <p className="text-base text-slate-500 mt-3">{BENEFITS[0].description}</p>
                        </div>

                        <div className="rounded-3xl p-8 border shadow-sm flex flex-col bg-white border-slate-200">
                            <h3 className="text-xl font-medium tracking-tight border-b pb-4 mb-4 text-slate-900">{BENEFITS[1].title}</h3>
                            <p className="text-base text-slate-500">{BENEFITS[1].description}</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="rounded-3xl p-8 border shadow-sm flex flex-col bg-white border-slate-200">
                            <div className="h-40 w-full rounded-2xl border mb-6 flex flex-col items-center justify-center bg-slate-50 border-slate-100">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                </div>
                                <div className="w-3/4 h-20 bg-white rounded-lg border shadow-sm p-4 space-y-2">
                                    <div className="h-1.5 w-full bg-slate-100 rounded-full"></div>
                                    <div className="h-1.5 w-5/6 bg-slate-100 rounded-full"></div>
                                    <div className="h-1.5 w-4/6 bg-slate-100 rounded-full"></div>
                                </div>
                            </div>
                            <h3 className="text-xl font-medium tracking-tight text-slate-900">{BENEFITS[2].title}</h3>
                            <p className="text-base text-slate-500 mt-3">{BENEFITS[2].description}</p>
                        </div>

                        <div className="rounded-3xl p-8 border shadow-sm flex flex-col flex-1 bg-white border-slate-200">
                            <h3 className="text-xl font-medium tracking-tight text-slate-900">{BENEFITS[3].title}</h3>
                            <p className="text-base text-slate-500 mt-3">{BENEFITS[3].description}</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="rounded-3xl p-8 border shadow-sm flex flex-col bg-white border-slate-200">
                            <div className="w-full rounded-2xl p-4 border mb-6 flex flex-col gap-2 bg-slate-50 border-slate-100">
                                <div className="flex items-center gap-3 p-3 rounded-xl border shadow-sm bg-white border-slate-100">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-100 text-blue-600"><Sparkles className="w-4 h-4" /></div>
                                    <div><div className="text-sm font-medium text-slate-900">{BENEFITS_PREMIUM.advice_title}</div><div className="text-xs text-slate-400">{BENEFITS_PREMIUM.advice_status}</div></div>
                                </div>
                            </div>
                            <h3 className="text-xl font-medium tracking-tight text-slate-900">{BENEFITS[4].title}</h3>
                            <p className="text-base text-slate-500 mt-3">{BENEFITS[4].description}</p>
                        </div>

                        <div className="rounded-3xl p-8 border shadow-lg flex flex-col flex-1 bg-gradient-to-br relative overflow-hidden border-[#1F8A77]/20 from-[#1F8A77]/10 to-[#F4A261]/10">
                            <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-4 -translate-y-4">
                                <Award strokeWidth={1} className="w-32 h-32 text-[#1F8A77] fill-[#1F8A77]" />
                            </div>
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-md text-white bg-[#1F8A77]">
                                    <Briefcase strokeWidth={2} className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-medium tracking-tight mb-4 text-slate-900">{BENEFITS_PREMIUM.premium_title}</h3>
                                <p className="text-base mb-8 flex-grow text-slate-600">{BENEFITS_PREMIUM.premium_description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
