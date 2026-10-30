export type BlogBlock =
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "heading";
      text: string;
    }
  | {
      type: "list";
      items: string[];
    };

export type BlogSection = {
  id: string;
  image: string;
  imageAlt: string;
  blocks: BlogBlock[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  readTime: string;
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "leather-jacket-lifetime-investment",
    title: "Why a Leather Jacket Lasts a Lifetime (And Why That’s a Better Investment)",
    excerpt:
      "Fast fashion fades. Real leather improves. Here’s why a well-made jacket pays for itself in years of wear, character, and cost-per-wear.",
    coverImage: "/blog/leather-jacket-lifetime/01-lifetime-patina.jpg",
    publishedAt: "2026-10-27",
    readTime: "6 min read",
    sections: [
      {
        id: "intro",
        image: "/blog/leather-jacket-lifetime/01-lifetime-patina.jpg",
        imageAlt: "A patina-rich leather jacket beside a newer hide piece",
        blocks: [
          {
            type: "paragraph",
            text: "Most jackets are temporary. Trends shift, seams fail, fabric pills, and the piece is gone within a few seasons. A properly made leather jacket works the opposite way: the more you wear it, the more it becomes yours.",
          },
          {
            type: "paragraph",
            text: "At Guild & Grain, we build for that long arc—hides and construction meant to survive years of real life. Buying leather is less about a single outfit and more about owning something that keeps returning value every time you put it on.",
          },
        ],
      },
      {
        id: "aging",
        image: "/blog/leather-jacket-lifetime/02-aging-beauty.jpg",
        imageAlt: "Close-up of leather developing a rich natural patina",
        blocks: [
          {
            type: "heading",
            text: "It Doesn’t Expire—It Evolves",
          },
          {
            type: "paragraph",
            text: "Synthetic coats often look best on day one. Full-grain leather looks best after years. Soft creases, deeper tone, and a lived-in sheen—called patina—are not damage. They are the record of your wear.",
          },
          {
            type: "list",
            items: [
              "Durability: Quality hides resist abrasion far better than thin fashion fabrics.",
              "Repairability: Stitching, zips, and linings can be serviced; the shell often outlasts its hardware.",
              "Character: No two jackets age the same, so your piece becomes genuinely personal.",
              "Fewer replacements: One lasting jacket replaces a stack of short-lived outerwear buys.",
            ],
          },
          {
            type: "paragraph",
            text: "That is the quiet economy of leather: you stop shopping for the same category over and over.",
          },
        ],
      },
      {
        id: "investment",
        image: "/blog/leather-jacket-lifetime/04-heirloom.jpg",
        imageAlt: "Leather jacket styled as an heirloom piece with artisan tools",
        blocks: [
          {
            type: "heading",
            text: "Think Cost-Per-Wear, Not Checkout Price",
          },
          {
            type: "paragraph",
            text: "An inexpensive jacket worn ten times is expensive. A stronger leather jacket worn hundreds of times becomes one of the cheapest pieces in your wardrobe—measured honestly.",
          },
          {
            type: "list",
            items: [
              "Divide once, wear often: Higher upfront cost spreads across years of weekly use.",
              "Season-proof staple: Leather bridges cool evenings, travel days, and dressed-down nights out.",
              "Resale & heirloom value: Well-kept leather can be passed on or kept in rotation for decades.",
              "Less waste: Buying fewer, better jackets is kinder to your closet and the planet than constant turnover.",
            ],
          },
          {
            type: "paragraph",
            text: "If you want a piece that still looks intentional five or fifteen years from now, start with honest leather and solid make—then wear it without saving it for “special.” Lifetime jackets are made by living in them.",
          },
        ],
      },
    ],
  },
  {
    slug: "timeless-leather-classic",
    title: "The Timeless Classic: Why Leather Jackets Never Go Out of Style",
    excerpt:
      "From cafe racers to bikers, leather has stayed relevant for generations. Here’s why the silhouette endures—and how to choose a classic that stays current.",
    coverImage: "/blog/timeless-leather-classic/05-timeless-silhouette.jpg",
    publishedAt: "2026-10-27",
    readTime: "6 min read",
    sections: [
      {
        id: "intro",
        image: "/blog/timeless-leather-classic/05-timeless-silhouette.jpg",
        imageAlt: "A classic leather jacket silhouette in cinematic evening light",
        blocks: [
          {
            type: "paragraph",
            text: "Trends rotate. Leather remains. For decades, the leather jacket has moved from motorcycle culture to music stages to everyday wardrobes without losing its edge—or its usefulness.",
          },
          {
            type: "paragraph",
            text: "That staying power is not nostalgia alone. Classic leather cuts are simple, adaptable, and grounded in function. At Guild & Grain, we lean into those silhouettes because they still earn their place in a modern closet.",
          },
        ],
      },
      {
        id: "everyday",
        image: "/blog/timeless-leather-classic/03-everyday-classic.jpg",
        imageAlt: "Leather biker jacket worn as an everyday timeless look",
        blocks: [
          {
            type: "heading",
            text: "A Classic Works on Ordinary Days",
          },
          {
            type: "paragraph",
            text: "True classics are not costume. They are the jacket you throw on with jeans, a knit, or a clean shirt without overthinking the outfit.",
          },
          {
            type: "list",
            items: [
              "Clean lines age better than loud seasonal details.",
              "Neutral tones—black, deep brown, cognac—pair with almost everything you already own.",
              "A strong shoulder and balanced length keep the jacket looking intentional as styles around it change.",
              "Hardware should support the design, not date it with oversized novelty.",
            ],
          },
          {
            type: "paragraph",
            text: "If a jacket only works for one very specific look, it is a trend. If it quietly improves most of your outfits, it is a classic.",
          },
        ],
      },
      {
        id: "versatility",
        image: "/blog/timeless-leather-classic/06-versatility.jpg",
        imageAlt: "One leather jacket styled across casual and polished looks",
        blocks: [
          {
            type: "heading",
            text: "One Jacket, Many Chapters",
          },
          {
            type: "paragraph",
            text: "Versatility is why leather remains a smart long-term buy. The same piece can shift from weekend errands to evening plans without feeling like a costume change.",
          },
          {
            type: "list",
            items: [
              "Casual: Tee, denim, boots—leather adds structure and polish.",
              "Smart-casual: Over a shirt or fine knit for dinners and travel days.",
              "Layering: Works across seasons as a mid-layer or outer shell.",
              "Identity: A classic cut still leaves room for your own style—watches, scarves, footwear—without competing.",
            ],
          },
          {
            type: "paragraph",
            text: "Browse Guild & Grain for silhouettes built to stay relevant, or email us if you want help picking a timeless cut for how you actually dress. Classics are not frozen in the past—they are ready for whatever comes next.",
          },
        ],
      },
    ],
  },
  {
    slug: "leather-quality-guide",
    title: "How to Check Leather Quality: Grain, Origin, and Process",
    excerpt:
      "Learn how to read leather like a maker—grain types, where hides come from, tanning, finishing, and the hand tests that separate lasting leather from lookalikes.",
    coverImage: "/blog/leather-quality-guide/01-quality-origin.jpg",
    publishedAt: "2026-10-27",
    readTime: "8 min read",
    sections: [
      {
        id: "intro",
        image: "/blog/leather-quality-guide/01-quality-origin.jpg",
        imageAlt: "Premium leather hides hanging in a heritage tannery",
        blocks: [
          {
            type: "paragraph",
            text: "Not all “genuine leather” is equal. Two jackets can share a label and feel worlds apart after six months of wear. Quality shows up in the grain, the origin of the hide, the tanning method, and the finishing—long before marketing copy does.",
          },
          {
            type: "paragraph",
            text: "At Guild & Grain, our leather is rooted in Pakistan’s tannery tradition: local hides, careful processing, and craft that respects the material. This guide is what we wish every buyer knew when judging leather with their eyes and hands.",
          },
        ],
      },
      {
        id: "origin",
        image: "/blog/leather-quality-guide/01-quality-origin.jpg",
        imageAlt: "Raw hides prepared in a traditional leather workshop",
        blocks: [
          {
            type: "heading",
            text: "Where the Leather Comes From Matters",
          },
          {
            type: "paragraph",
            text: "Leather begins as a byproduct of the meat industry. The best makers treat that origin with transparency: which animal, which region’s tanneries, and what standards guide the process.",
          },
          {
            type: "list",
            items: [
              "Regional craft: Pakistan is known for skilled tanning and cutting—generations of makers who understand how hides behave in jackets.",
              "Animal type: Cowhide tends to be tougher and more structured; sheepskin is softer, lighter, and more immediate in comfort.",
              "Traceable supply: Strong brands can speak to tannery partnerships instead of vague “imported leather” claims.",
              "Ethics in practice: Responsible sourcing means working with established tanneries, not chasing the cheapest anonymous stock.",
            ],
          },
          {
            type: "paragraph",
            text: "Ask where the hide was tanned and finished. A clear answer is usually a good sign. Silence or buzzwords alone are not.",
          },
        ],
      },
      {
        id: "grain",
        image: "/blog/leather-quality-guide/02-grain.jpg",
        imageAlt: "Macro detail of full-grain leather pores and natural texture",
        blocks: [
          {
            type: "heading",
            text: "Reading the Grain",
          },
          {
            type: "paragraph",
            text: "Grain is the surface fingerprint of leather. It tells you how much of the hide’s natural structure was kept—and how the leather will age.",
          },
          {
            type: "list",
            items: [
              "Full-grain: The top surface is intact. You may see pores, subtle scars, and variation. It breathes better and develops the richest patina.",
              "Top-grain: The surface is sanded or corrected for uniformity, then finished. Cleaner look, slightly less natural character than full-grain.",
              "Corrected / heavily coated: Flaws are buffed away and covered with a thick finish. Looks even at first, but can feel plasticky and crack sooner.",
              "Split / bonded (watch-outs): Lower layers or reconstituted fibers. Often used in cheaper pieces; less durable for a lifelong jacket.",
            ],
          },
          {
            type: "paragraph",
            text: "Natural marks are not defects in good leather—they are proof you are looking at a real hide, not a printed imitation of one.",
          },
        ],
      },
      {
        id: "process",
        image: "/blog/leather-quality-guide/03-tanning-process.jpg",
        imageAlt: "Craftsman working leather through the tanning process",
        blocks: [
          {
            type: "heading",
            text: "The Process: From Hide to Jacket Leather",
          },
          {
            type: "paragraph",
            text: "Tanning turns a perishable hide into stable leather. How it is done shapes softness, strength, color depth, and environmental impact.",
          },
          {
            type: "list",
            items: [
              "Prep: Hides are cleaned and prepared so the fiber structure can accept tannins evenly.",
              "Tanning: Vegetable tanning uses plant tannins for character and firmness; chrome tanning is faster and often yields softer, more uniform leather. Many modern jackets use carefully controlled chrome or combination methods.",
              "Retanning & dyeing: Builds hand-feel, color, and performance for apparel use.",
              "Fatliquoring: Oils and waxes are introduced so the leather flexes without drying brittle.",
              "Finishing: From light aniline (more natural) to pigmented coats (more uniform and protective). Lighter finishes show grain; heavier ones hide it.",
            ],
          },
          {
            type: "paragraph",
            text: "Quality process shows in consistency: even color that still looks alive, edges that do not chalk instantly, and leather that flexes without whitening cracks.",
          },
        ],
      },
      {
        id: "hand-tests",
        image: "/blog/leather-quality-guide/04-hand-feel.jpg",
        imageAlt: "Hands flexing a leather hide to judge quality",
        blocks: [
          {
            type: "heading",
            text: "Hand Tests You Can Do Yourself",
          },
          {
            type: "paragraph",
            text: "You do not need a lab. A few simple checks separate honest leather from coated shortcuts.",
          },
          {
            type: "list",
            items: [
              "The flex test: Bend a panel. Real quality leather wrinkles softly and recovers. Cheap coatings may show white stress lines.",
              "The smell test: Genuine leather has a warm, organic scent. Strong chemical or plastic smell suggests heavy synthetic finish or poor processing.",
              "The touch test: It should feel substantial—not sticky, rubbery, or oddly cold like vinyl.",
              "The edge test: Look at cut edges or underside when possible. Leather has fibrous depth; fake materials often look uniform like fabric or plastic.",
              "The thickness & drape test: Jacket leather should feel purposeful for its style—firm for structured bikers, supple for fashion-forward soft cuts—without feeling papery.",
            ],
          },
        ],
      },
      {
        id: "finished",
        image: "/blog/leather-quality-guide/05-finished-quality.jpg",
        imageAlt: "Finished leather jacket panel beside a raw hide sample",
        blocks: [
          {
            type: "heading",
            text: "What “Good” Looks Like When It Is Finished",
          },
          {
            type: "paragraph",
            text: "On a completed jacket, quality is the sum of hide and make. Check panels for matched grain direction, clean stitching, and hardware that feels equal to the leather’s weight.",
          },
          {
            type: "list",
            items: [
              "Color with depth: Dye that sits in the leather, not a flat paint sitting on top.",
              "Breathable comfort: Full-grain and thoughtfully finished leathers feel less clammy over time.",
              "Honest aging: Expect soft shine and tone shifts with wear—not peeling film.",
              "Maker clarity: Brands that explain grain, origin, and process are usually proud of both.",
            ],
          },
          {
            type: "paragraph",
            text: "If you want help reading a piece from our catalog—or comparing cowhide versus sheepskin for how you live—email Guild & Grain. We would rather walk you through the leather than leave quality to guesswork.",
          },
          {
            type: "paragraph",
            text: "Know the grain. Respect the process. Wear leather that earns its years.",
          },
        ],
      },
    ],
  },
  {
    slug: "choosing-leather-jacket",
    title: "How to Choose the Right Leather Jacket",
    excerpt:
      "A practical guide to silhouette, fit, construction, and care—so your next leather jacket feels inevitable, not impulsive.",
    coverImage: "/blog/choosing-leather-jacket/01-choosing-cover.jpg",
    publishedAt: "2026-10-27",
    readTime: "7 min read",
    sections: [
      {
        id: "intro",
        image: "/blog/choosing-leather-jacket/01-choosing-cover.jpg",
        imageAlt: "Premium leather jackets displayed in a boutique atelier",
        blocks: [
          {
            type: "paragraph",
            text: "A leather jacket is rarely a casual purchase. Done well, it becomes the piece you reach for for a decade or more—the one that looks better the longer you wear it. Done poorly, it sits in the closet after one season.",
          },
          {
            type: "paragraph",
            text: "At Guild & Grain, we help people choose jackets the way artisans build them: by silhouette, hide, construction, and fit. This guide walks through what actually matters before you commit—whether you are browsing our catalog or comparing options elsewhere.",
          },
        ],
      },
      {
        id: "silhouette",
        image: "/blog/choosing-leather-jacket/05-silhouettes.jpg",
        imageAlt: "Biker, cafe racer, and long coat leather jacket silhouettes",
        blocks: [
          {
            type: "heading",
            text: "Start With Silhouette, Not Color",
          },
          {
            type: "paragraph",
            text: "Color is easy to love. Shape is what decides whether the jacket belongs in your wardrobe. Begin by matching the cut to how you actually dress most days.",
          },
          {
            type: "list",
            items: [
              "Biker: Asymmetric zip, lapels, and attitude. Best if you want a classic statement that still works with denim and boots.",
              "Cafe racer: Clean front zip, stand collar, slim lines. Ideal for a sharper, modern everyday look.",
              "Bomber: Ribbed cuffs and hem, easier and more casual. Great for layering over tees and knits.",
              "Trucker / western: Button fronts and chest pockets. Rugged, versatile, and easy with workwear.",
              "Long coat / blazer: More polish. Choose these when you want leather that can dress up beyond weekends.",
            ],
          },
          {
            type: "paragraph",
            text: "If you only buy one jacket, pick the silhouette you would wear on an ordinary Tuesday—not only on a night out.",
          },
        ],
      },
      {
        id: "construction",
        image: "/blog/choosing-leather-jacket/02-construction.jpg",
        imageAlt: "Close-up of leather jacket zipper hardware and stitching",
        blocks: [
          {
            type: "heading",
            text: "What Quality Looks Like Up Close",
          },
          {
            type: "paragraph",
            text: "Real leather already has character. Construction is what keeps that character looking intentional instead of unfinished. When you inspect a jacket, slow down and check the details.",
          },
          {
            type: "list",
            items: [
              "Stitching: Even, tight, and consistent. Loose threads or wavy seams are early warning signs.",
              "Hardware: Zips should glide without catching. Metal pullers and snaps should feel solid, not hollow or flimsy.",
              "Lining: A clean, well-attached lining helps the jacket hang properly and last longer.",
              "Seams & panels: Look for balanced panels and reinforced stress points at shoulders, pockets, and underarms.",
              "Hide feel: Genuine leather should feel substantial and smell like leather—not plasticky or overly coated.",
            ],
          },
          {
            type: "paragraph",
            text: "A beautiful grain cannot rescue weak construction. Prioritize how the jacket is built as much as how it photographs.",
          },
        ],
      },
      {
        id: "fit",
        image: "/blog/choosing-leather-jacket/03-fit.jpg",
        imageAlt: "Well-fitted black leather jacket showing clean shoulder line",
        blocks: [
          {
            type: "heading",
            text: "Fit: The Non-Negotiables",
          },
          {
            type: "paragraph",
            text: "Leather molds over time, but it will not magically fix the wrong size. Aim for structure now and comfort later—especially with firmer cowhide.",
          },
          {
            type: "list",
            items: [
              "Shoulders: The seam should sit at the edge of your shoulder, not halfway down your arm.",
              "Chest & back: Room to layer a sweater without ballooning. You should raise your arms without the hem yanking up sharply.",
              "Sleeves: Hitting near the wrist bone is usually right; a touch of length is fine because leather settles.",
              "Length: Cropped styles suit casual looks; longer hems feel more refined and cover more of the torso.",
              "Break-in reality: Soft sheepskin feels ready immediately. Thicker cowhide may feel firm at first, then become glove-like with wear.",
            ],
          },
          {
            type: "paragraph",
            text: "If you are between sizes, consider your preferred layering. A jacket bought only for summer tees often fights you in cooler months.",
          },
        ],
      },
      {
        id: "care",
        image: "/blog/choosing-leather-jacket/04-care-longevity.jpg",
        imageAlt: "Leather jacket with care cloth and conditioner",
        blocks: [
          {
            type: "heading",
            text: "Longevity: Buy Once, Care Simply",
          },
          {
            type: "paragraph",
            text: "The right jacket earns its keep through seasons of wear. A little care protects the hide and helps the patina develop evenly.",
          },
          {
            type: "list",
            items: [
              "Hang it: Use a wide, sturdy hanger so the shoulders keep their shape.",
              "Give it air: After wear, let the jacket rest instead of sealing it in a plastic bag.",
              "Wipe gently: Dust and light dirt respond to a soft dry cloth; avoid soaking the leather.",
              "Condition sparingly: A quality leather conditioner a few times a year is usually enough—do not over-oil.",
              "Mind the weather: Rain happens. Blot, reshape, and dry away from direct heat. Never use a radiator or hair dryer.",
            ],
          },
          {
            type: "paragraph",
            text: "When you are ready, browse the Guild & Grain catalog by style and hide—or email us with your fit notes. We would rather help you choose the right jacket than rush the wrong one.",
          },
          {
            type: "paragraph",
            text: "Wear it often. Let it age with you.",
          },
        ],
      },
    ],
  },
  {
    slug: "about-our-leather",
    title: "About Our Leather: The Heritage and Quality Behind Every Jacket",
    excerpt:
      "Rooted in Pakistan’s centuries-old leather craftsmanship, every Guild & Grain jacket bridges heritage skill and modern design.",
    coverImage: "/blog/about-our-leather/01-heritage.jpg",
    publishedAt: "2026-10-16",
    readTime: "6 min read",
    sections: [
      {
        id: "heritage",
        image: "/blog/about-our-leather/01-heritage.jpg",
        imageAlt: "Artisan inspecting fine leather hides in a workshop",
        blocks: [
          {
            type: "paragraph",
            text: "At Guild & Grain, we believe that a great leather jacket is more than just an outer layer—it's an investment, a statement, and a lifelong companion. Rooted in Pakistan's rich, centuries-old tradition of fine leather craftsmanship, every jacket we create bridges the gap between heritage skill and modern design.",
          },
          {
            type: "paragraph",
            text: "From the moment raw hides enter our hands to the final stitch, we are committed to uncompromising quality, ethical sourcing, and timeless style. When you wear one of our jackets, you aren't just wearing leather; you are wearing a piece of art shaped by master artisans.",
          },
        ],
      },
      {
        id: "craftsmanship",
        image: "/blog/about-our-leather/02-craftsmanship.jpg",
        imageAlt: "Skilled craftsman working leather with traditional tools",
        blocks: [
          {
            type: "heading",
            text: "Where Craftsmanship Meets Heritage",
          },
          {
            type: "paragraph",
            text: "Pakistan is globally renowned for its exceptional leather industry, boasting skilled tanners and craftsmen who have perfected their trade across generations. We proudly source our hides locally from the finest tanneries in the region.",
          },
          {
            type: "paragraph",
            text: "We combine traditional tanning methods with contemporary standards to ensure our leather is durable, supple, and rich in character. Because real leather is a natural material, no two jackets are identical. Subtle grain variations, natural markings, and unique textures mean that your jacket is entirely one-of-a-kind.",
          },
          {
            type: "paragraph",
            text: "We primarily work with two premium types of leather: Cowhide and Sheepskin. Each offers a completely different look, feel, and aging experience. Here is how to find the right match for your style.",
          },
        ],
      },
      {
        id: "cowhide",
        image: "/blog/about-our-leather/03-cowhide.jpg",
        imageAlt: "Close-up of rugged black cowhide leather grain",
        blocks: [
          {
            type: "heading",
            text: "1. Cowhide: The Mark of Rugged Durability",
          },
          {
            type: "list",
            items: [
              "The Vibe: Bold, classic, and indestructible.",
              "Best For: Traditional biker jackets, heavy-duty everyday wear, and those looking for maximum protection and structure.",
              "The Feel: Cowhide is substantial, thick, and firm when new. It is built to weather the elements and stand up to decades of wear.",
              "The Break-In: It requires a brief break-in period, gradually molding precisely to your body shape to create a custom, glove-like fit over time.",
              "The Aging: Cowhide ages exquisitely, developing a deep, rich patina—a gorgeous sheen and color depth that tells the story of every road you travel.",
            ],
          },
        ],
      },
      {
        id: "sheepskin",
        image: "/blog/about-our-leather/04-sheepskin.jpg",
        imageAlt: "Soft sheepskin leather jacket with butter-smooth texture",
        blocks: [
          {
            type: "heading",
            text: "2. Sheepskin: Unmatched Softness and Luxurious Comfort",
          },
          {
            type: "list",
            items: [
              "The Vibe: Sophisticated, sleek, and effortless.",
              "Best For: Fashion-forward designs, lightweight daily styling, and transitioning seamlessly from day to night.",
              "The Feel: Incredibly soft, butter-smooth, and remarkably lightweight. It offers a luxurious second-skin sensation the very first time you put it on, requiring zero break-in period.",
              "Thermal Performance: Sheepskin naturally regulates temperature—trapping warmth when it's cold outside while remaining breathable and comfortable.",
              "The Aging: It drapes smoothly over the body, maintaining its plush, flexible feel while becoming even softer with every single wear.",
            ],
          },
        ],
      },
      {
        id: "promise",
        image: "/blog/about-our-leather/05-promise.jpg",
        imageAlt: "Finished Guild & Grain leather jacket in a studio setting",
        blocks: [
          {
            type: "heading",
            text: "Our Promise to You",
          },
          {
            type: "paragraph",
            text: "We stand behind the authenticity and durability of everything we make. By cutting out unnecessary middlemen and working directly with local artisans, we bring you luxury-grade leather jackets without compromise.",
          },
          {
            type: "paragraph",
            text: "Explore our collection today and find the hide that speaks to your story.",
          },
          {
            type: "paragraph",
            text: "Wear authentic. Wear Guild & Grain.",
          },
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
