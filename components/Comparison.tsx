import { Star, ArrowRight, Briefcase, FileText, Check, Globe, Sparkles, X } from "lucide-react";
import { COMPARISON_FEATURES, COMPARISON_CONTENT } from "@/constants/marketing";

const ICON_MAP: Record<string, any> = {
    "Free ATS Templates": FileText,
    "One-Click Portfolio Site": Globe,
    "AI Resume Generation": Sparkles,
};

export default function Comparison() {
    return (
        <section className="w-full py-24 border-t border-slate-100">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    <div className="w-full lg:w-1/3">
                        <span className="px-4 py-1.5 border rounded-full text-sm font-medium text-slate-500 shadow-sm inline-block mb-6 bg-slate-50 border-slate-200">{COMPARISON_CONTENT.badge}</span>
                        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight text-slate-900 font-display">
                            {COMPARISON_CONTENT.title.split('to')[0]} <br /><span className="inline-flex items-center gap-2 text-[#1F8A77]"><Star strokeWidth={2} className="w-8 h-8 fill-[#1F8A77]/20" /> To {COMPARISON_CONTENT.title.split('to')[1]}</span>
                        </h2>
                        <p className="text-lg text-slate-500 mt-6 mb-8 leading-relaxed">
                            {COMPARISON_CONTENT.description}
                        </p>
                    </div>

                    <div className="w-full lg:w-2/3 overflow-x-auto rounded-3xl border shadow-sm border-slate-200">
                        <table className="w-full text-left border-collapse min-w-[600px]">
                            <thead>
                                <tr>
                                    <th className="p-6 border-b text-base font-medium text-slate-500 w-1/2 bg-white border-slate-200">Features</th>
                                    <th className="p-6 border-b border-l text-center text-base font-semibold w-1/4 bg-slate-50 border-slate-200 text-slate-900">{COMPARISON_CONTENT.others_label}</th>
                                    <th className="p-6 border-b text-center text-base font-semibold w-1/4 rounded-tr-3xl text-white bg-[#1F8A77] border-[#1F8A77]">
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-5 h-5 rounded flex items-center justify-center bg-white text-[#1F8A77]"><Briefcase className="w-3 h-3" /></div> {COMPARISON_CONTENT.jobstory_label}
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-base text-slate-700 bg-white">
                                {COMPARISON_FEATURES.map((feature) => {
                                    const Icon = ICON_MAP[feature.name];
                                    return (
                                        <tr key={feature.name} className="border-b transition-colors border-slate-100 hover:bg-slate-50">
                                            <td className="p-6 font-medium flex items-center gap-3">
                                                <Icon strokeWidth={1.5} className="w-5 h-5 text-slate-400" /> {feature.name}
                                            </td>
                                            <td className="p-6 text-center border-l border-slate-100">
                                                {feature.common ? (
                                                    <div className="w-6 h-6 rounded-full flex items-center justify-center mx-auto bg-slate-800 text-white"><Check strokeWidth={2} className="w-3 h-3" /></div>
                                                ) : (
                                                    <div className="w-6 h-6 rounded-full flex items-center justify-center mx-auto bg-slate-100"><X strokeWidth={2} className="w-3 h-3 text-slate-400" /></div>
                                                )}
                                            </td>
                                            <td className="p-6 text-center border-l bg-[#1F8A77]/5 border-[#1F8A77]/10">
                                                {feature.jobstory && (
                                                    <div className="w-6 h-6 rounded-full flex items-center justify-center mx-auto bg-[#1F8A77]/20"><Check strokeWidth={2} className="w-4 h-4 text-[#1F8A77]" /></div>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}
