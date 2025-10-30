"use client";
import React from "react";

type ModalProps = {
    open: boolean;
    title?: string;
    onClose: () => void;
    children: React.ReactNode;
};

export default function Modal({ open, title, onClose, children }: ModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl p-4 w-[400px]">
                <div className="flex justify-between items-center border-b pb-2 mb-3">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-black"
                    >
                        ✕
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}
