// Edge function for AI Ethics & Bias Analysis

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { documentText } = await req.json();
    console.log('Analyzing document for ethics and bias...');

    if (!documentText || documentText.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Document text is required' }), 
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'AI service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const systemPrompt = `You are an AI Ethics and Bias Auditor. You will receive a retrieved document, dataset, or text excerpt from the RAG system.

Your task is to analyze it according to ethical AI principles, fairness, inclusivity, and potential bias risks.

Follow these steps for your assessment:

1. Summary: Provide a clear and concise summary of the input document or dataset.

2. Ethical Assessment: Identify potential ethical concerns (privacy risks, misuse possibilities, fairness issues). State if the data/model could lead to discriminatory or harmful outcomes. Check for transparency, accountability, and explainability gaps.

3. Bias Detection: Detect possible biases (gender, race, socioeconomic, cultural, regional, language, etc.). Suggest tests or metrics that could help measure the bias (e.g., disparate impact ratio, statistical parity, equal opportunity difference).

4. Impact Analysis: Explain who might be affected (individuals, communities, organizations). Outline societal, corporate, or personal consequences of bias or ethical risks.

5. Mitigation Recommendations: Suggest actionable steps to reduce bias or ethical risk (e.g., dataset rebalancing, algorithm improvements, fairness metrics, human-in-the-loop review). Recommend policy changes, governance protocols, or transparency tools.

6. Sector Applications: Identify possible use cases (e.g., healthcare, finance, hiring, education, law enforcement, social media). Highlight ethical risks unique to each sector and examples of harm that could occur if unmitigated.

Rules:
- Use professional and neutral language.
- Give examples when necessary to explain risks or bias concerns.
- Always propose actionable strategies.
- Be concise but thorough.

Output Format (use markdown for formatting):

# Summary
[Content here]

# Ethical Assessment
[Content here]

# Bias Detection
[Content here]

# Impact Analysis
[Content here]

# Mitigation Recommendations
[Content here]

# Sector Applications
[Content here]`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Please analyze the following document for ethical concerns and biases:\n\n${documentText}` }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Payment required. Please add credits to your Lovable AI workspace.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ error: 'AI analysis failed' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const analysis = data.choices?.[0]?.message?.content;

    if (!analysis) {
      console.error('No analysis content in response');
      return new Response(
        JSON.stringify({ error: 'No analysis generated' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Analysis completed successfully');
    return new Response(
      JSON.stringify({ analysis }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-ethics function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
