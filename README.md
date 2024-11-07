# Technical Assessment Questions

## 1. Website/Landing Page Project

Create a website or landing page for your favorite product, company, bar or band

- Complexity, style and tech stack of your choice
- Deliverable: Functional deployed link (e.g. on Vercel)

---

https://flipasstavvy.vercel.app/dashboard

## 2. Short Answer Questions

Please provide 1-3 paragraphs per question:

- Why do you want to work for Flipas?
  I think you are onto something special ;) . I like the idea, I like the technology, and I like building projects from this stage

- What draws you to computers and technology?
  Technology is what actually changes people's lives in reality. There's nothing comparable to the industrial revolution, and nowadays computers and the internet are having a similar impact. I also just like building things

- What is your favorite aspect of programming?
  There's a strange feeling of satisfaction when you build something that is reliable, consistent and predictable. There aren't many other comparable aspects in life other than math

- If you couldn't work in tech, what career would you pursue?
  I would probably be a comedian.

## 3. Technical Problems

Choose one or more of the following problems to solve:

### B. Tag Normalization

Given an array of profile tags like: ["JavaScript", "JavaScript", "React", "TypeScript", "react", "REACT"]
Write a function that:

- Removes case-insensitive duplicates
- Normalizes casing (first letter uppercase, rest lowercase)
- Returns sorted results
- Deliverable: TypeScript function returning ["JavaScript", "React", "TypeScript"]

---

The description contains an error, because by the second rule (first letter uppercase, rest lowercase) JavaScript should be Javascript. Below you'll find the solution for this rule. It's easier to read with Lodash, in my opinion, but with vanilla typescript you can just do

```
  function tagNormalizer(tags: string[]) {
    return Array.from(new Set(tags.map((tag) => tag.toLowerCase()))).map(
      (tag) => tag.charAt(0).toUpperCase() + tag.slice(1)
    );
  }
```

### D. Profile Search Component

You have a profile search component that filters through thousands of profiles:

```
type Profile = {
    id: string;
    name: string;
    labels: string[];
    location: string;
    lastActive: Date;
}

```

Users can:

- Search by name
- Filter by multiple labels
- Filter by location
- Sort by last active date

How would you implement this to ensure good performance?
Discuss your approach and any optimizations you'd make.

---

The first decision is whether to run the search in the frontend or in the backend. Without the full context we can't rule out running it in the frontend, but in most cases this should be done in the backend. This is because of the likely volume of data, as well as potential data security reasons.

If we did it in the frontend, it means we had previously requested all possible profiles. In that case I would just use something such as:

```
profiles.filter(
      (profile) =>
        (nameFilter && nameFilter === profile.name) ||
        (labelFilter && profile.labels.includes(labelFilter)) ||
        (locationFilter && locationFilter === profile.location)
    );

profiles.sort((a, b) => isAscendingOrderFilter ?
    a.lastActiveDate.getTime() - b.lastActiveDate.getTime() :
    b.lastActiveDate.getTime() - a.lastActiveDate.getTime());

```

We could do some optimizations if we knew that some of the filtering options were going to be much more used. E.g. if we knew that the name filter is the most used one, we could store the profiles in a dictionary where the keys are the name. Then we only access the profiles with a specific name, and we apply the rest of the filters on those profiles

If we did it in the backend, I would let the DB do the filtering, obviously. In that case if we wanted to optimize, first of all we would need a good DB design. We would have a table Profile, and a table ProfileLabels, and if needed the queries would join those tables to filter out the correct profiles. We would also consider using indexes to optimize the speed, knowing which parameters are most used to filter profiles
