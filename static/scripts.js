// code to add \\newline to every elements last if found multiple '='
[
    "\\text{$(a+b)^2 = a^2+2ab+b^2 = (a+b)^2+4ab$}",
    "\\text{$(a-b)^2 = a^2-2ab+b^2 = (a+b)^2-4ab$}",
    "\\text{$a^2+b^2 = (a+b)^2-2ab = (a-b)^2+2ab = \\frac{1}{2}(a+b)^2(a-b)^2$}",
    "\\text{$a^2-b^2 = (a+b)(a-b)$}"
].map(a => a.split('=')).map(b => b.map((c, i) => b.length >= 3 && i >= 0 && i !== b.length - 1 ? c += '\\newline' : c).join('='))



