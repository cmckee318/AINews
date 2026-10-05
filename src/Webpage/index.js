const button = document.getElementById("mainBtn");
const mainContain = document.getElementById("mainContainer");

button.addEventListener("click", function(){
    callNewsManager().then((articles) => {
        mainContain.innerHTML = "";
        createElements(articles);
   }).catch((err) => {
       console.log(err);
       alert(err);
   })

});

async function callNewsManager(){
    return "Title: Supreme Court's new term kicks off with blockbuster climate change case\n" +
        "Link: https://text.npr.org/nx-s1-5970070\n" +
        "Summary: The US Supreme Court begins its new term on Monday with a landmark climate change case, Boulder v. Suncor Energy and Exxon Mobil, which could have far-reaching implications for state power and corporate accountability.\n" +
        "Important Detail: The case centers around Boulder County's lawsuit against the two energy companies, alleging they deceived people about the harms of fossil fuels and contributed to disasters that cost the county millions. The dispute raises questions about whether corporations can be held liable for their alleged environmental harms, and whether states have the authority to regulate production and liability.\n" +
        "\n" +
        "\n" +
        "Title: Voters Turn to AI-Powered Chatbots to Research Ballots in Midterm Elections\n" +
        "Link: https://text.npr.org/nx-s1-5977852\n" +
        "Summary: As the midterm elections approach, a growing number of voters are turning to AI-powered chatbots like ChatGPT and Gemini to research their ballots. These chatbots provide information on candidates, issues, and voting records, but experts warn that they can also be subtly persuasive and biased. Users must be aware of these potential pitfalls and take steps to minimize bias, such as framing prompts in a neutral way and fact-checking information across multiple sources.\n" +
        "Important Detail: Experts caution that while AI-powered chatbots can be useful research tools, their properties make them vulnerable to manipulation and bias. Rafael Batista, a fellow at John Hopkins University, notes that these models \"might select some things that would reinforce and persuade you even more towards the way that you were leaning already,\" leaving users feeling more confident without necessarily learning more about the world. To mitigate this risk, users can take steps such as framing their prompts in a neutral way, using incognito mode, and fact-checking information across multiple sources.\n" +
        "\n" +
        "\n" +
        "The article discusses various cybersecurity threats and vulnerabilities that were discovered or reported in the past week. Some of the notable mentions include:\n" +
        "\n" +
        "* A new variant of NodeStealer, a malware that can steal sensitive information from infected devices, was detected by Netskope Threat Labs.\n" +
        "* An Iranian hacker was extradited to the US for allegedly being behind a cyber espionage campaign targeting hundreds of universities, federal and state government agencies, private sector companies, and non-governmental organizations.\n" +
        "* A new variant of Citrix NetScaler was discovered that can be exploited to gain unauthorized access to systems.\n" +
        "* A vulnerability in Apple's CoreGraphics library was patched, which could have been used to deliver targeted attacks.\n" +
        "* A phishing campaign using WhatsApp PDF checks was reported, which could have been used to deliver malware or steal sensitive information.\n" +
        "* A ransomware leak site and servers were seized by law enforcement, potentially revealing more information about the attackers.\n" +
        "* A critical FortiMail zero-day flaw was exploited in attacks, allowing unauthenticated arbitrary file writes.\n" +
        "* Dell CSM vulnerabilities enabled unauthenticated admin access and root on Kubernetes nodes.\n" +
        "* GitLab patched a critical 9.9 AI Gateway flaw that allowed command execution on self-hosted servers.\n" +
        "\n" +
        "The article also highlights the importance of patching exposed systems, reviewing trusted default settings, and keeping an eye on simple paths to prevent cybersecurity threats. It also mentions the need for security teams to have visibility, controls, and governance to keep access to sensitive systems and data in check as AI agents continue to operate within enterprises.\n" +
        "\n" +
        "Overall, the article provides a summary of various cybersecurity threats and vulnerabilities that were discovered or reported in the past week, highlighting the importance of staying vigilant and proactive in protecting against cyber threats.\n" +
        "\n" +
        "\n" +
        "Title: The Credential Layer Is Expanding Faster Than Security Teams Can See It\n" +
        "Link: https://thehackernews.com/2026/10/the-credential-layer-is-expanding.html\n" +
        "Summary: The credential layer, which connects people, applications, infrastructure, and services across an enterprise, is expanding at an alarming rate. This expansion creates a vast attack surface that security teams struggle to keep up with. GitGuardian's research shows that the number of hardcoded secrets in public GitHub commits increased by 34% year-over-year, while leaked credentials associated with AI services rose by 81%. To combat this issue, security teams need to establish visibility into the credential layer and understand its context, including validity, ownership, permissions, and dependencies. The approach of \"detect, remediate, and prevent\" starts with creating a usable inventory of the credential layer.\n" +
        "\n" +
        "Important Detail: GitGuardian's research highlights the growing threat of credential exposure, which is becoming increasingly difficult for security teams to manage. The company's analysis of systems compromised during the Shai-Hulud 2 supply-chain campaign revealed that 33,185 unique secrets were found on compromised machines, with 44% containing more than 10 secrets and 5% containing over 100. This underscores the need for security teams to develop strategies to detect, remediate, and prevent credential exposure, as well as to establish visibility into the credential layer to ensure effective coverage of their existing secrets-management programs."

}

function createElements(articles) {
    const blocks = articles.split("Title: ").slice(1); // one chunk per article

    for (const block of blocks) {
        const get = (label) => {
            const m = block.match(new RegExp("^" + label + ": (.*)$", "m"));
            return m ? m[1] : "";
        };

        const newElement = document.createElement("div");
        newElement.className = "newsContain";

        const title = document.createElement("h3");
        title.className = "title";
        // the title is the first line of the block, since "Title: " was the split point
        title.textContent = block.split("\n")[0];

        const link = document.createElement("a");
        link.href = get("Link");
        link.textContent = "LINK";

        const summary = document.createElement("p");
        summary.className = "summary";
        summary.textContent = get("Summary");

        const facts = document.createElement("p");
        facts.className = "facts";
        facts.textContent = get("Important Detail");

        newElement.append(title, link, summary, facts);
        newElement.addEventListener("click", function(){
            window.open(link.href, '_blank');
        });
        mainContain.appendChild(newElement);
    }
}
