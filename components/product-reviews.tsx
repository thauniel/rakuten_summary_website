'use client'

import { useState, useEffect } from 'react'

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const categories = ["イヤホン", "加湿器"] as const;
const products = {
  "イヤホン": ["QCY-T1C完全ワイヤレスイヤホン第3/4世代"],
  "加湿器": ["小型加湿器S08"],
} as const;

const reviews = {
  "QCY-T1C完全ワイヤレスイヤホン第3/4世代": {
    positive: "このイヤホンは、コストパフォーマンスに優れた製品です。音質はクリアで聴きやすいものの、低音や奥行きには欠けるとの意見もありますが、価格を考えれば満足度は高いです。接続も簡単で、毎日の通学時に重宝しています。充電の持ちも良好で、ハイテク機能が満載です。通話も問題なく行えるため、音楽以外の使用でも十分に使えます。また、購入時にポイントが付くことで、よりお得に買える点も評価されています。全体的に、性能は価格相応ですが、使い勝手の良さが際立つ製品です。",
    negative: "音質自体は悪くないものの、いくつかの問題が報告されています。購入から一ヶ月以内に左耳の接続が不良となり、充電持続時間が最大でも2〜3時間に制限されました。さらに、充電器にセットしてもフル充電にならず、残量が20〜30%で止まる現象があり、これが初期不良とされて商品交換が行われました。また、価格に対して扱いやすさや使い勝手は良いものの、磁力が強く、取り扱いに苦労する点も指摘されています。音楽の音質は良いが、通話品質は普通という意見もありました。"
  },
  "小型加湿器S08": {
    positive: "この加湿器は、注文翌日に届き、ミストの量が多くて気持ち良いと好評です。サイズは小さいですが、持ち運びに便利で、音も静かなので仕事中でも使いやすいとのこと。値段も手頃で、特に一人での使用に適しています。細かいミストでしっかり加湿でき、デザインも可愛く、コンパクトなため狭い部屋や車での使用に向いています。ただし、加湿効果の実感には個人差があるようです。全体的に買って良かったという評価です。",
    negative: "使用開始から数回でミストが出なくなり、コストパフォーマンスに疑問を感じていることが述べられています。加湿器の音は静かで、加湿量も多いため、寝室での使用には向いていると評価されていますが、加湿効果が弱く、ボタンを長時間押し続けてもミストが出ないことに不満を抱いています。値段相応とも感じている一方、故障さえしなければ長期間使用できることに期待を寄せています。全体的に、品質や耐久性に対する懸念が強調されています。"
  },
  "Laptop": {
    positive: "Powerful performance and sleek design.",
    negative: "Battery life could be better."
  },
  "Fiction": {
    positive: "Engaging storyline and well-developed characters.",
    negative: "The ending felt a bit rushed."
  },
  "Blender": {
    positive: "Efficient and easy to clean.",
    negative: "A bit noisy during operation."
  }
}

export function ProductReviewsComponent() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [selectedProduct, setSelectedProduct] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (selectedCategory) {
      setSelectedProduct(products[selectedCategory as keyof typeof products][0]); // Type assertion
    }
  }, [selectedCategory]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleProductChange = (value: string) => {
    setSelectedProduct(value);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Select onValueChange={handleCategoryChange} value={selectedCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="商品ジャンル" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={handleProductChange} value={selectedProduct} disabled={!selectedCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="商品名" />
            </SelectTrigger>
            <SelectContent>
              {selectedCategory && products[selectedCategory as keyof typeof products].map((product) => (
                <SelectItem key={product} value={product}>
                  {product}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedProduct && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ThumbsUp className="mr-2 text-red-500" />
                  Positive Review
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{reviews[selectedProduct as keyof typeof reviews]?.positive || "No positive review available."}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ThumbsDown className="mr-2 text-blue-500" />
                  Negative Review
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{reviews[selectedProduct as keyof typeof reviews]?.negative || "No negative review available."}</p>
              </CardContent>
            </Card>
          </div>
        )}

          {selectedProduct && (
          <div className="text-center">
          <a href="https://rakuten-review-website.vercel.app/" target="_blank" rel="noopener noreferrer">
            <Button size="lg">More Detail</Button>
          </a>
        </div>
        )}
      </div>
    </div>
  )
}