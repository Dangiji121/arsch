document.addEventListener(&quot;DOMContentLoaded&quot;, function() {
    var script = document.createElement(&quot;script&quot;);
    script.setAttribute(&quot;type&quot;, &quot;application/ld+json&quot;);

    var postTitle = document.querySelector(&quot;.post-title&quot;) ? document.querySelector(&quot;.post-title&quot;).innerText.trim() : document.title;
    var postAuthor = document.querySelector(&quot;.g-profile&quot;) ? document.querySelector(&quot;.g-profile&quot;).innerText.trim() : &quot;Unknown&quot;;
    var postAuthorUrl = document.querySelector(&quot;.g-profile&quot;) ? document.querySelector(&quot;.g-profile&quot;).href : &quot;https://www.blogger.com/profile/00000000000000000000&quot;;
    var postDateElement = document.querySelector(&quot;.meta-info span:nth-child(2)&quot;);
    var postImage = document.querySelector(&quot;.post-content img&quot;) ? document.querySelector(&quot;.post-content img&quot;).src : &quot;Your Default Image URL&quot;;
    var postUrl = window.location.href;
    var blogName = document.querySelector(&quot;meta[property=&#39;og:site_name&#39;]&quot;) ? document.querySelector(&quot;meta[property=&#39;og:site_name&#39;]&quot;).content : &quot;Your Blog Name&quot;;
    var blogLogo = &quot;Your Blog Logo URL&quot;;

    var labels = document.querySelectorAll(&quot;.post-meta a[rel=&#39;tag&#39;]&quot;);
    var categories = labels.length &gt; 0 ? labels[0].innerText.trim() : &quot;&quot;;
    var keywords = Array.from(labels).map(label =&gt; label.innerText.trim()).join(&quot;, &quot;);

    function formatDate(dateString) {
        if (!dateString) return &quot;&quot;;
        let date = new Date(dateString);
        return date.toISOString();
    }

    var postDate = postDateElement ? formatDate(postDateElement.innerText.trim()) : &quot;&quot;;

    var jsonLdData = {
        &quot;@context&quot;: &quot;https://schema.org&quot;,
        &quot;@type&quot;: &quot;Article&quot;,
        &quot;headline&quot;: postTitle,
        &quot;author&quot;: {
            &quot;@type&quot;: &quot;Person&quot;,
            &quot;name&quot;: postAuthor,
            &quot;url&quot;: postAuthorUrl
        },
        &quot;datePublished&quot;: postDate,
        &quot;dateModified&quot;: postDate,
        &quot;mainEntityOfPage&quot;: {
            &quot;@type&quot;: &quot;WebPage&quot;,
            &quot;@id&quot;: postUrl
        },
        &quot;publisher&quot;: {
            &quot;@type&quot;: &quot;Organization&quot;,
            &quot;name&quot;: blogName,
            &quot;logo&quot;: {
                &quot;@type&quot;: &quot;ImageObject&quot;,
                &quot;url&quot;: blogLogo
            }
        },
        &quot;image&quot;: postImage,
        &quot;url&quot;: postUrl,
        &quot;articleSection&quot;: categories,
        &quot;keywords&quot;: keywords
    };

    script.textContent = JSON.stringify(jsonLdData, null, 2);
    document.head.appendChild(script);
});
