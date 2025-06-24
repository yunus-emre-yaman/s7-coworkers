/* eslint-disable no-undef */
import { useState } from "react";
import { test, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";

import path from "path";
import fs from "fs";
import "../App";

// Axios'u mockla
vi.mock("axios");

const pkg = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "./../../package.json"), "utf-8")
);
const appCode = fs.readFileSync(path.resolve(__dirname, "../App.jsx"), "utf-8");

const formPath = path.resolve(__dirname, "../components/NewMemberForm.jsx");
const isFormExist = fs.existsSync(formPath);
const formCode = isFormExist ? fs.readFileSync(formPath, "utf-8") : null;

const cwPath = path.resolve(__dirname, "../components/CoworkerList.jsx");
const isCwExists = fs.existsSync(cwPath);
//

test("reactstrap ve bootstrap paketleri kurulmuş mu?", () => {
  expect(
    pkg.dependencies["reactstrap"] || pkg.devDependencies["reactstrap"]
  ).toBeDefined();
  expect(
    pkg.dependencies["bootstrap"] || pkg.devDependencies["bootstrap"]
  ).toBeDefined();
});

test("App.jsx'e bootstrap css'i dokümantasyondaki gibi import edilmiş mi?", () => {
  expect(appCode.includes("bootstrap/dist/css/bootstrap.min.css")).toBe(true);
});

test("App içinde handleAddMember adında bir fonksiyon tanımlanmış mı?", () => {
  const pattern = new RegExp(
    // 1. "function handleAddMember(" olabilir
    // 2. "const handleAddMember = (..." olabilir
    // 3. Boşluklara karşı toleranslı
    String.raw`\b(?:function|const)\s+handleAddMember\s*(=)?\s*(\(.*?\)|function\s*\(.*?\))`,
    "s"
  );

  expect(appCode).toMatch(pattern);
});

test("NewMemberForm componenti oluşturulmuş mu?", () => {
  expect(isFormExist).toBe(true);
});

(isFormExist ? test : test.fails)(
  "NewMemberForm içinde reactstrap form elemanları (Form, FormGroup, Label, Input) kullanılmış mı?",
  () => {
    const keywords = ["Form", "FormGroup", "Label", "Input"];
    keywords.forEach((keyword) => {
      expect(formCode).toMatch(new RegExp(`\\b${keyword}\\b`));
    });
  }
);

(isFormExist ? test : test.fails)(
  "NewMemberForm formu submit edildiğinde addMember doğru veriyle çağrılıyor ve axios doğru adrese istek atıyor mu?",
  async () => {
    const NewMemberForm = (await import("../components/NewMemberForm.jsx"))
      .default;

    const mockAddMember = vi.fn();

    // Axios sahte cevabı: API'den dönen veri
    const mockResponseData = {
      fullName: "Ali",
      email: "ali@example.com",
      notes: "",
    };

    axios.post.mockResolvedValue({ data: mockResponseData });

    render(<NewMemberForm addMember={mockAddMember} />);

    // Formu doldur
    fireEvent.change(screen.getByLabelText(/ad soyad/i), {
      target: { value: "Ali" },
    });

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "ali@example.com" },
    });

    // Formu gönder
    fireEvent.click(screen.getByRole("button", { name: /kaydet/i }));

    // addMember çağrıldı mı?
    await waitFor(() => {
      expect(mockAddMember).toHaveBeenCalledWith(mockResponseData);
    });

    // axios.post doğru URL ve verilerle çağrıldı mı?
    expect(axios.post).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/posts",
      mockResponseData
    );
  }
);

(isFormExist ? test : test.fails)(
  "Kullanıcı başarılı response sonrası state'e ekleniyor mu?",
  async () => {
    const NewMemberForm = (await import("../components/NewMemberForm.jsx"))
      .default;
    function TestWrapper() {
      const [members, setMembers] = useState([]);
      function handleAddMember(member) {
        setMembers((prev) => [...prev, member]);
      }

      return (
        <div>
          <NewMemberForm addMember={handleAddMember} />
          <ul>
            {members.map((m) => (
              <li key={m.id}>{m.fullName}</li>
            ))}
          </ul>
        </div>
      );
    }

    axios.post.mockResolvedValueOnce({
      data: {
        fullName: "Ali",
        email: "ali@example.com",
        notes: "",
      },
    });

    render(<TestWrapper />);

    fireEvent.change(screen.getByLabelText(/ad soyad/i), {
      target: { value: "Ali" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "ali@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /kaydet/i }));

    await waitFor(() => {
      expect(screen.getByText("Ali")).toBeInTheDocument();
    });
  }
);

(isFormExist ? test : test.fails)(
  "Form submit sonrası başarılı response ile form sıfırlanıyor mu?",
  async () => {
    const NewMemberForm = (await import("../components/NewMemberForm.jsx"))
      .default;

    const mockAddMember = vi.fn();

    const mockResponseData = {
      fullName: "Ali",
      email: "ali@example.com",
      notes: "",
    };

    axios.post.mockResolvedValue({ data: mockResponseData });

    render(<NewMemberForm addMember={mockAddMember} />);

    // Form alanlarını doldur
    const nameInput = screen.getByLabelText(/ad soyad/i);
    const emailInput = screen.getByLabelText(/email/i);

    fireEvent.change(nameInput, { target: { value: "Ali" } });
    fireEvent.change(emailInput, { target: { value: "ali@example.com" } });

    // Submit et
    fireEvent.click(screen.getByRole("button", { name: /kaydet/i }));

    // addMember çağrılana kadar bekle
    await waitFor(() => {
      expect(mockAddMember).toHaveBeenCalledWith(mockResponseData);
    });

    // Formun sıfırlandığını kontrol et
    expect(nameInput.value).toBe("");
    expect(emailInput.value).toBe("");
  }
);

test("CoworkerList.jsx componentı oluşturulmuş mu?", () => {
  expect(isCwExists).toBe(true);
});

(isCwExists ? test : test.fails)(
  "CoworkerList render edildiğinde Coworker bileşenlerini gösteriyor mu?",
  async () => {
    // Dinamik import (ESM) yapıyoruz:
    const CoworkerList = (await import("../components/CoworkerList.jsx"))
      .default;

    // Örnek props
    const members = [
      { fullName: "Ahmet Yılmaz", email: "ahmet@example.com" },
      { fullName: "Ayşe Demir", email: "ayse@example.com" },
    ];

    render(<CoworkerList members={members} />);
    expect(screen.getByText("AY")).toBeInTheDocument();
    expect(screen.getByText("Ahmet Yılmaz")).toBeInTheDocument();
    expect(screen.getByText("ahmet@example.com")).toBeInTheDocument();

    expect(screen.getByText("AD")).toBeInTheDocument();
    expect(screen.getByText("Ayşe Demir")).toBeInTheDocument();
    expect(screen.getByText("ayse@example.com")).toBeInTheDocument();
  }
);
